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

    
    const eventsSampleList = ["147278572", "147782485", "147454127", "146421295", "145562147", "141019107"];


      // res.render('index', { events: allEvents }); 
      res.json({ events: eventsSampleList }); 


      //res.json({ events: eventsSampleList }); 

  })
  .catch( (error) => {
    res.render('error', { error });
  });

  /*
  axios.get(bccEventsURL)
    .then( (response) => {
      const {data} = response;
      const allEvents = data; // array of event data
      // Apply filters 
      // const updatedEvents = applyFilters(allEvents, filters);
      // const rsp = JSON.stringify(updatedEvents); 
      const updatedEvents = allEvents;
      if (filters == "Refresh") {
        res.render('userApi', { events: updatedEvents }); 
      }
    })
    .catch( (error) => {
      res.render('error', { error });
    })
    */
});

/*
function applyFilters(allEvents, filters){
  let eventsFiltered; 
  if (filters.contains(ten)){
    // filter by first 10 events
    
  }
  eventsFiltered = allEvents.splice(0, 9);
  return eventsFiltered;
}
*/

module.exports = router;
