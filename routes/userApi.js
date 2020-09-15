const express = require("express");
const axios = require('axios');
const router = express.Router();


router.get("/filter/:filters", function (req, res) {
  // receive current filter
  const { filters } = req.params;
  // API URLs
  const bccEventsURL = "http://www.trumba.com/calendars/brisbane-city-council.json"; // NOTE: this is wrapped in an array
  const weatherRainProbabilty = `https://api.willyweather.com.au/v2/Y2MwYTdlOWVkNWI1YzViYzlmNjA5Yz/locations/5381/weather.json?forecasts=rainfallprobability&days=7&startDate=${getFormattedDate()}`;
  // execute simultaneous requests 
  axios.all([
    // Get JSON data from BCC - next 200 events
    axios.get(bccEventsURL),
    // Get weather API data, by filter type
    axios.get(weatherRainProbabilty)
  ])
  .then( responseArr => {
    //this will be executed only when all requests are complete
    const bccEventsData = responseArr[0].data;
    const weatherData = responseArr[1].data;
    // Update events based on requested filter
    let updatedEventsIds = updateEventsByFilter(filters, bccEventsData, weatherData );
    res.json({ events: updatedEventsIds }); 
  })
  .catch( (error) => {
    res.render('error', { error });
  });
});

// FILTERING FUNCTIONS
//
// Handles filter requests
function updateEventsByFilter( filt, bccData, weatherData ){
  let updatedEvents = [];
  if ( filt == "NO-RAIN" ) {
    return filterByLowRain(bccData, weatherData);
  }
  else if (filt == "RAIN"){
    // get list of all ID's
    return getIdsFromBCCData(bccData);
  }
  else { return getIdsFromBCCData(bccData) }
}

// Takes events and rain data
// Returns list of events with low probability of rain 
function filterByLowRain(bccData, rain){
  let updatedEvents = [];

  const eventsSampleList = [146804901, 146996308, 146906240, 145090320, 147136542];
  updatedEvents = eventsSampleList;

  return updatedEvents; 
}




// TODO REMOVE BELOW
// TEMP function
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}




// HELPER FUNCTIONS
//
// Takes BCC API data
// Returns list of ID's 
function getIdsFromBCCData(bccData){
  ids = [];
  // TODO 
  for (let ev of bccData ){
    // const evObj = JSON.parse(ev);
    ids.push( ev.eventID );
    //ids.push( ev.eventID.toString() );
  }
  return ids;
}

// Returns current date formatted as:
// YYYY-MM-DD 
function getFormattedDate(){
  let date = new Date; 
  let yyyy = date.getFullYear();
  let mm = ("0" + (date.getMonth() + 1)).slice(-2);
  let dd = ("0" + date.getDate()).slice(-2);
  return `${yyyy}-${mm}-${dd}`;
}

// export to router 
module.exports = router;
