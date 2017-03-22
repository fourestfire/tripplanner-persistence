'use strict';

$(function(){

var $optionsPanel = $('#options-panel');
var $hotelSelect = $optionsPanel.find('#hotel-choices');
var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
var $activitySelect = $optionsPanel.find('#activity-choices');

var hotels, restaurants, activities

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

});
