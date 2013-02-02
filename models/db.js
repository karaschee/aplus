var config = require('../config.js');
module.exports = require("mongojs").connect(config.db, config.collection);