import keys from '../config/keys';
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
    app.post(
        '/api/stripe',
        (req, res) => {
            const charge = await stripe.charges.create({
                amount: 2000,
                currency: 'usd',
                source: 'tok_amex',
                description: 'My First Test Charge (created for API docs)',
            });
        }
    );
};