const express = require('express');
const axios = require('axios');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  
  const bccEventsURL = "http://www.trumba.com/calendars/brisbane-city-council.json";

  axios.get(bccEventsURL)
    .then( (response) => {
      const rsp = response.data; 
      res.render('index', { rsp }); 
    })
    .catch( (error) => {
      res.render('error', { error });
    })
});

module.exports = router;
