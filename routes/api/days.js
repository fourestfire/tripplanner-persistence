var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

//finds all days
router.get('/api/days', function(req, res, next) {
    Day.findAll()
    .then( (daysArr) => {
        res.status(200).send(daysArr);
    })
    .catch(next)
});


//specific day
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
        res.status(200).send(specificDay);
    })
    .catch(next)
});


router.post('/api/days/:id/restaurants', function(req, res, next) {

})

module.exports = router;
