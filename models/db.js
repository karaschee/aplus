var config = require('../config.js');

console.log(config);

module.exports = require("mongojs").connect(config.db, config.collection);