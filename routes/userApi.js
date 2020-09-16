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
    // Update event ID's and data based on requested filter
    let updatedEventsIds = updateEventsByFilter(filters, bccEventsData, weatherData );
    let updatedEventData = getEventDataFromIds(updatedEventsIds, bccEventsData);
    // respond appropriately 
    res.json({ eventData: updatedEventData }); 
  })
  .catch( (error) => {
    res.render('error', { error });
  });
});

// FILTERING FUNCTIONS
//
// Handles filter requests
function updateEventsByFilter( filt, bccData, weatherData ){
  if (filt == "RESET"){
    return getIdsFromBCCData(bccData); // All ID's 
  }
  else if (filt == 100){
    // all rain data 
    return getIdsFromBCCData(bccData);
  }
  else if ( filt == 0 || filt == 5 || filt == 10 || filt == 20 || filt == 50 ) {
    return filterByRainProbability(bccData, weatherData, filt);
  }
  else if ( filt.split(':', 1)[0] == "Event type"){
    return filterByEventType( filt, bccData );
  }
  else { return getIdsFromBCCData(bccData) }
}

// Takes event type filter 
// Returns list of event ID's of required type 
function filterByEventType(filt, bccData){
  let updatedEventIds = [];
  let eventType = filt.split(':', 2)[1];
  if ( eventType == "ANY") {
    // get all ID's 
    updatedEventIds = getIdsFromBCCData(bccData); 
  }
  else {
    // Get events with required ID 
    for (let ev of bccData ){
      for (let i of ev.customFields) {
        if (i.label == "Event type"){
          let value = i.value; 
          let valuesAtomic = value.split(',', 100);
          for (let val of valuesAtomic){
            if (val == eventType ) {
              updatedEventIds.push( ev.eventID );
            }
          }
        }
      }
    }
  }
  return updatedEventIds;
}

// Takes events and rain data
// Returns list of events with low probability of rain 
function filterByRainProbability(bccData, rainProbData, probabilityMax){
  let updatedEventIds = [];
  // date times from weather data which are below the probability requested
  const dateTimesBelowMaxProbability = getDateTimesWithRainProbabilityBelowThreshold(rainProbData, probabilityMax); 
  const dateTimesOfAllProbability = getDateTimesWithRainProbabilityAll(rainProbData);
  // check which BCC events fit the bill 
  for (let ev of bccData){
    let start = ev.startDateTime;
    let end = ev.endDateTime; 
    let startSplit = start.split('T', 2);
    let endSplit = end.split('T', 2);
    let startDay = startSplit[0];
    let endDay = endSplit[0]
    let startTime = startSplit[1];
    let endTime = endSplit[1]
    // For single day events 
    if ( startDay == endDay ){
      // counter for acceptable P times vs all P times that fall in duration of this event
      let acceptableProbTimesInEventTime = 0;
      let totalProbTimesInEventTime = 0;
      // Check acceptable probability datetimes 
      for (let dateTimeP of dateTimesBelowMaxProbability){
        // Only check for this day 
        let datePSplit = dateTimeP.split(' ', 1)[0];
        if (datePSplit == startDay) {
          let timeProbLowEnough = Date.parse(dateTimeP); 
          let dateTimeStart = Date.parse(start); 
          let dateTimeEnd  = Date.parse(end); 
          if ( dateTimeStart < timeProbLowEnough && timeProbLowEnough < dateTimeEnd ){
            acceptableProbTimesInEventTime++;
          }
        }
      }
      // check all probabilities in this time
      for (let p of dateTimesOfAllProbability){
        // Only check for this day 
        let pSplit = p.split(' ', 1)[0];
        if (pSplit == startDay) {
          let timeProb = Date.parse(p); 
          let dateTimeStart = Date.parse(start); 
          let dateTimeEnd  = Date.parse(end); 
          if ( dateTimeStart < timeProb && timeProb < dateTimeEnd ){
            totalProbTimesInEventTime++;
          }
        }
      }
      if (totalProbTimesInEventTime == acceptableProbTimesInEventTime) {
        // all P times during even are acceptable - add event ID to list 
        updatedEventIds.push(ev.eventID);
      }
    }
  }
  updatedEventIds.push(updatedEventIds.length);
  return updatedEventIds; 
}

// Returns date time strings which are below given p threshold
function getDateTimesWithRainProbabilityBelowThreshold(rainProbData, rainThresholdProbability){
  const daysArr = rainProbData.forecasts.rainfallprobability.days;
  datesRainProbabilityTooHigh = [];
  for (let d of daysArr){
    for (let entry of d.entries ){
      if ( entry.probability <= rainThresholdProbability ) {
        datesRainProbabilityTooHigh.push(entry.dateTime);
      }
    }
  }
  return datesRainProbabilityTooHigh;
}

// Returns date time strings for all probability data 
function getDateTimesWithRainProbabilityAll(rainProbData){
  const daysArr = rainProbData.forecasts.rainfallprobability.days;
  datesTimesRainProb = [];
  for (let d of daysArr){
    for (let entry of d.entries ){
      datesTimesRainProb.push(entry.dateTime);
    }
  }
  return datesTimesRainProb;
}

// HELPER FUNCTIONS
//
// Takes Array of event ID's and BCC API data
// Returns Array of event data only for the ID's given 
function getEventDataFromIds(ids, bccData){
  let eventArr = [];
  for (let ev of bccData ){
    if ( ids.includes(ev.eventID) ){
      eventArr.push( ev );
    }
  }
  return eventArr;
}

// Takes BCC API data
// Returns list of ALL ID's 
function getIdsFromBCCData(bccData){
  let ids = [];
  for (let ev of bccData ){
    ids.push( ev.eventID );
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

// EXPORT 
// To Router
module.exports = router;
