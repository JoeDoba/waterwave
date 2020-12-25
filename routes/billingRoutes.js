const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post(
        '/api/stripe', 
        requireLogin,  //Require Login middleware to make sure user must login before move-on adding funds.
        async (req, res) => {
            // console.log(req.body);
            await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                source: req.body.id,
                description: '$5 fro 5 credits',
            });
            req.user.credits += 5;
            const user = await req.user.save();
            res.send(user);
        }
    );
};