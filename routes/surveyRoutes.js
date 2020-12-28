const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const checkCredit = require('../middlewares/checkCredit');
const Survey = mongoose.model('survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
module.exports = (app) => {
    app.post(
        '/api/surveys',
        requireLogin,
        checkCredit,
        async (req, res) => {
            const {title, subject, body, recipients} = req.body;
            const newSurvey = new Survey({
                title: title,
                subject: subject,
                body: body,
                recipients: recipients.split(',').map(email => {return {email: email.trim()}}),
                // yes & no counter are default set to be 0
                _user: req.user.id,
                dateSent: Date.now(),
            });
            const newMailer = new Mailer(newSurvey, surveyTemplate(newSurvey));
            try {
                await newMailer.send();
                await newSurvey.save();
                req.user.credits -= 1;
                const user = await req.user.save();
                res.send(user);
            } catch (err) {
                res.status(422).send(err);
            }
        }
    );

    app.get(
        '/api/surveys/thanks',
        (req, res) => {
            res.send('Thank you for your feedback!');
        }
    );
};