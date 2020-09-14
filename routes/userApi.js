const express = require("express");
const axios = require('axios');
const router = express.Router();



router.get("/filter/:filters", function (req, res) {
  // receive filters
  const { filters } = req.params;
  // Refresh JSON data from BCC - next 200 events
  const bccEventsURL = "http://www.trumba.com/calendars/brisbane-city-council.json";

  // execute simultaneous requests 
  axios.all([
    // BCC Events
    axios.get(bccEventsURL)
    // Weather API 

  ])
  .then(  responseArr  => {
    //this will be executed only when all requests are complete
    const bccEventsRsp = responseArr[0]; 
    // const weatherData = responseArr[1]; 

    // Update events based on requested filter
    let updatedEvents = updateEventsByFilter(filters);
    // res.render('index', { events: allEvents }); 
    res.json({ events: updatedEvents }); 
  })
  .catch( (error) => {
    res.render('error', { error });
  });
});


function updateEventsByFilter( filt, data ){
  let updatedEvents = [];
  
  const eventsSampleList = ["147278572", "147782485", "147454127", "146421295", "145562147", "141019107"];

  updatedEvents = eventsSampleList;

  return updatedEvents;
}




module.exports = router;
