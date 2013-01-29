var config = require('../config');

module.exports = require("mongojs").connect(config.db, config.collection);