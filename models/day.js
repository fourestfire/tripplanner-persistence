/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    // get: function() {
    //     return this.getDataValue('number');
    // }
  },
}, {
  defaultScope: {
    include: [Hotel]
  },
  instanceMethods: {

  },
  hooks: {

  },
  classMethods: {
    shift: function(numberWePassed) {
      Day.findAll({
        where: {
          number: {
            $gt: numberWePassed
          }
        }
      })
      .then((dayList) => {
        // console.log("daylist is this", dayList)
        console.log("daylist len is this", dayList.length)
        for (var i = 0; i < dayList.length; i++) {
          var index = dayList[i].getDataValue('number');
          console.log(index)
          dayList[i].number = --index
          dayList[i].save()
          // we need to do promise.all so that async ops work properly.
          // don't delete things too quickly!
        }
      })
    }
  },
  getterMethods: {

  }
});

module.exports = Day
