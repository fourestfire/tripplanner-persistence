/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');

var Day = db.define('day', {
  number: Sequelize.INTEGER,
}, {
  defaultScope: {
    include: [Hotel]
  },
});

module.exports = Day
