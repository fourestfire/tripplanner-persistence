'use strict';

$(function(){

  var $optionsPanel = $('#options-panel');
  var $hotelSelect = $optionsPanel.find('#hotel-choices');
  var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
  var $activitySelect = $optionsPanel.find('#activity-choices');

  var hotels, restaurants, activities;


  // on page load
  //Ajax to fill the menu bars
  $.ajax({
    method: 'GET',
    url: '/api/hotels',
  })
  .then(function (responseData) {
    hotels = responseData;
    hotels.forEach(makeOption, $hotelSelect);
  })
  .catch( console.error.bind(console) );

  $.ajax({
    method: 'GET',
    url: '/api/restaurants',
  })
  .then(function (responseData) {
    restaurants = responseData;
    restaurants.forEach(makeOption, $restaurantSelect);
  })
  .catch( console.error.bind(console) );

  $.ajax({
    method: 'GET',
    url: '/api/activities',
  })
  .then(function (responseData) {
    activities = responseData;
    activities.forEach(makeOption, $activitySelect);
  })
  .catch( console.error.bind(console) );


  // create first day if no day exists
  $.ajax({
    method: 'POST',
    url: 'api/days/1'
  })
  .then((message) => {console.log(message)})
  .catch( console.error.bind(console) );

  // populate view with existing days
  $.ajax({
      method: 'GET',
      url: '/api/days',
    })
    .then(function (responseData) {
      console.log('got all data')
      var dayLength = responseData.length;
      for (var i = 1; i < dayLength; i++) {
        dayModule.create(responseData[i]);
      }
      // tripModule.switchTo(1)
    })
    .catch( console.error.bind(console) );


  //also fills menu bar
  // make all the option tags (second arg of `forEach` is a `this` binding)

  function makeOption (databaseAttraction) {
    var $option = $('<option></option>') // makes a new option tag
      .text(databaseAttraction.name)
      .val(databaseAttraction.id);
    this.append($option); // add the option to the specific select
  }

  // what to do when the `+` button next to a `select` is clicked
  $optionsPanel.on('click', 'button[data-action="add"]', function () {
    var $select = $(this).siblings('select');
    var type = $select.data('type'); // from HTML data-type attribute
    var id = $select.find(':selected').val();
    // get associated attraction and add it to the current day in the trip
    var attraction = attractionsModule.getByTypeAndId(type, id);
    tripModule.addToCurrent(attraction);
  });



  //ajax associated with the "day"
  $('#day-add').on('click', function() {
    // console.log('creating a day!');
    var id = $(this).siblings().last().text();
    $.ajax({
      method: 'POST',
      url: 'api/days/' + id
    })
    .then((message) => {console.log(message)})
    .catch( console.error.bind(console) );
  })

  $('#day-title > button.remove').on('click', function() {
    console.log('deleting the day')
    var id = $(this).prev().text().slice(-1);
    $.ajax({
      method: 'DELETE',
      url: 'api/days/' + id
    })
    .then((message) => {console.log(message)})
    .catch( console.error.bind(console) );

  })

  $('.panel-body').on('click', 'button', function(){
    let type = $(this).prev().data('type');
    let currentDay = $('#day-title > button.remove').prev().text().slice(-1);

    if(type === 'hotel') {
      // console.log('hotelsArr', hotels);
      var hotelIdToAdd = $(this).prev().val()
      console.log('id to find/add:', hotelIdToAdd)


      var hotelToAdd = hotels.find((current) => {
        console.log(current);
        return +current.id === +hotelIdToAdd;
      })

      console.log('hotelToAdd', hotelToAdd);
      var hotelAttraction = attractionModule.create(hotelToAdd)
      tripModule.addToCurrent(hotelAttraction);


      console.log('the current day is:', currentDay);
      $.ajax({
        method: 'POST',
        url: `api/days/${currentDay}/hotel/${hotelIdToAdd}`
      })
      .then((message) => {console.log(message)})
      .catch( console.error.bind(console) );
    } else if(type === 'restaurants') {

    } else if(type === 'activities') {

    }
  })

});
