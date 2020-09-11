const express = require("express");
const axios = require('axios');
const router = express.Router();



router.get("/filter/:filters", function (req, res) {
  // receive filters
  const { filters } = req.params;
  // Get updated JSON data from BCC - next 200 events
  const bccEventsURL = "http://www.trumba.com/calendars/brisbane-city-council.json";

  axios.get(bccEventsURL)
    .then( (response) => {
      const {data} = response;
      const allEvents = data; // array of each event data
      // Apply filters 
      const updatedEvents = applyFilters(allEvents, filters);
      
      res.render('user-api', { events: updatedEvents }); 
    })
    .catch( (error) => {
      res.render('error', { error });
    })
});


function applyFilters(allEvents, filters){
  let eventsFiltered; 
  if (filters.contains(ten)){
    // filter by first 10 events
    
  }
  eventsFiltered = allEvents.splice(0, 9);
  return eventsFiltered;
}

module.exports = router;
