const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/user');
require('./services/passpost');

mongoose.connect(keys.mongoURI);
const app = express();

// Middlewares dependencies
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// If runing under production modol
if (process.env.NODE_NEW === 'production') {
    // Express will serve up production assets like our main.js file, or main.css file!
    app.use(express. static('client/build'));
    // Epress will serve up the index.html file if it donesn't recognize the route.
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);