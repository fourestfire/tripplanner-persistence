var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

//finds all days
//this will happen when we refresh the page
//and need to get all of the days again
router.get('/api/days', function(req, res, next) {
    Day.findAll()
    .then((daysArr) => {
        res.status(200).send(daysArr);
    })
    .catch(next)
});


//get specific day
router.get('/api/days/:id', function(req, res, next) {
    Day.findById(req.params.id)
    .then((specificDay) => {
        res.status(200).send(specificDay);
    })
    .catch(next)
});

//delete one specific day
router.delete('/api/days/:id', function(req, res, next) {
    Day.findById(req.params.id)
    .then((specificDay) => {
        return specificDay.destroy()
    })
    .then((dayThatWasDestroyed) => {
      console.log("wedestroyedthisday", dayThatWasDestroyed)
      console.log("reqparamsid", req.params.id)
      Day.shift(req.params.id)
      return "";
    })
    .then(() => {
        res.status(202).send('deleted that day');
    })
    .catch(next)
});

//creates a specific day
router.post('/api/days/:id', function(req, res, next) {
    Day.findOrCreate({
      where: {
        number: req.params.id
      }
    })
    .then((instance) =>  {
        res.send('created a day!')
    })
    .catch(next)
})

module.exports = router;
