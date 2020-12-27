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
        (req, res) => {
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
            newMailer.send();
        }
    );
};