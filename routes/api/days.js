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

router.post('/api/days/:dayId/hotel/:hotelId', function(req, res, next) {
    console.log('we bout to save a homie');
    Day.findOne({
        where: {
            number: req.params.dayId
        }
    })
    .then((dayToModify) => {
        console.log(dayToModify)
        dayToModify.setHotel(req.params.hotelId);
        console.log("saved a homie")
    })
    .catch(()=> {
        console.log('error in 2nd place')
    });
});

router.post('/api/days/:dayId/restaurants/:restaurantId', function(req, res, next) {
    console.log('we bout to save a homie');
    Day.findOne({
        where: {
            number: req.params.dayId
        }
    })
    .then((dayToModify) => {
        console.log(dayToModify)
        dayToModify.setRestaurants(req.params.restaurantId);
        console.log("saved a homie")
    })
    .catch(()=> {
        console.log('error in 2nd place')
    });
});

// router.post('/api/days/:dayId/activities/:activityId', function(req, res, next) {
//     console.log('we bout to save a homie');
//     Day.findOne({
//         where: {
//             number: req.params.dayId
//         }
//     })
//     .then((dayToModify) => {
//         console.log(dayToModify)
//         dayToModify.setHotel(req.params.hotelId);
//         console.log("saved a homie")
//     })
//     .catch(()=> {
//         console.log('error in 2nd place')
//     });
// });

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
