const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const checkCredit = require('../middlewares/checkCredit');
const Survey = mongoose.model('surveys');
// const Recipient = mongoose.model('recipient');

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
                recipients: recipients.split(',').map(email => {return {email: email}}),
                // yes & no counter are default set to be 0
                _user: req.user,id,
                dateSent: Date.now(),
            });
        }
    );
};