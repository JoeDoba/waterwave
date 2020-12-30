const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');
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
        '/api/surveys/:surveyId/:choice',
        (req, res) => {
            res.send('Thank you for your feedback!');
        }
    );

    app.post(
        '/api/surveys/webhooks',
        (req, res) => {
            
            const p = new Path('/api/surveys/:surveyId/:choice');
            const events = _.chain(req.body)
            .map(({email, url}) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return {
                        email: email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }   
            })
            .compact() // Remove all undefine object events, which are either missing or mismatching url
            .uniqBy( 'email', 'surveyId') // Remove duplicate events with identical email and surveyId
            .each(({surveyId, email, choice}) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {email: email, clicked: false}
                    }
                },{
                    $inc: {[choice]: 1},
                    $set: {'recipients.$.clicked': true},
                    lastResponded: new Date(),
                }).exec();
            })
            .value();
            // console.log(events)
            res.send({});
        }
    );

    app.get(
        '/api/surveys',
        requireLogin,
        async (req, res) => {
            const surveys = await Survey.find({_user: req.user.id}) 
            // Find all survey records which were generated by current login user, 
            //and we dont want mongodb return whole survey objects since the recipients may be massive.
            .select({recipients: false});
            // Recipients are excluded in return objects
            res.send(surveys);
        }
    );
};