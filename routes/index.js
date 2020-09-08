const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // JSON format returns the next 200 evernts 
  const bccEventsURL = "http://www.trumba.com/calendars/brisbane-city-council.json";

  axios.get(bccEventsURL)
    .then( (response) => {
      const {data} = response;
      const allEvents = data; // array of each event data
      const eventsThisWeek = getEventsThisWeekInOrder(allEvents); 
      res.render('index', { events: eventsThisWeek }); 
    })
    .catch( (error) => {
      res.render('error', { error });
    })
});

function getEventsThisWeekInOrder(events){
  const millisecondsInWeek = 604800000; 
  let dateNowTimeStamp = Date.now(); // UNIX milliseconds 
  let datePlusWeekTimeStamp = dateNowTimeStamp + millisecondsInWeek; 
  let eventsThisWeek = []; 
  for (let event of events){
    let eventStartTimeStamp = Date.parse(event.startDateTime); 
    let eventEndDateTimeStamp = Date.parse(event.endDateTime); 
    // check for events that start within the next week
    if ( dateNowTimeStamp <= eventStartTimeStamp && eventStartTimeStamp <= datePlusWeekTimeStamp ) {
      eventsThisWeek.push(event);
    } // check for events started but not finished in the next week
    else if ( dateNowTimeStamp >= eventStartTimeStamp && eventEndDateTimeStamp <= datePlusWeekTimeStamp  ){
      eventsThisWeek.push(event);
    }
  }
  // sort events by start time before return 
  eventsThisWeek.sort( function(x, y) {
    Date.parse(x.startDateTime) - Date.parse(y.startDateTime);
  });
  return eventsThisWeek;
};

module.exports = router;
