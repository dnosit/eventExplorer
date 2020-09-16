const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // JSON format returns the next 200 events 
  const bccEventsURL = "http://www.trumba.com/calendars/brisbane-city-council.json";

  axios.get(bccEventsURL)
    .then( (response) => {
      const {data} = response;
      const allEvents = data; // array of each events data
      res.render('index', { events: allEvents }); 
    })
    .catch( (error) => {
      res.render('error', { error });
    })
});


module.exports = router;
