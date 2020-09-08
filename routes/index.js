const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  
  const bccEventsURL = "http://www.trumba.com/calendars/brisbane-city-council.json";

  axios.get(bccEventsURL)
    .then( (response) => {
      const {data} = response;
      const allEvents = data; // array of each event data
      // const allEventTitles = allEvents.title;
      res.render('index', { events: allEvents }); 
    })
    .catch( (error) => {
      res.render('error', { error });
    })
});

module.exports = router;
