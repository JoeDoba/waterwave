// key.js - figure out what set of config to return
if (process.env.NODE_ENV === 'production') {
    // We are in production - return the prod.js keys
    module.exports = require('./prod');
} else {
    // We are in production - return the dev.js keys
    module.exports = require('./dev');
}


