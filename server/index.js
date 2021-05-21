const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const controller = require('../db/controllers')
const db = require('../db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/../client/dist'));

app.post('/npsItinerary', controller.rsvp.findRsvpAndUpdate)
app.get('/npsItinerary', controller.rsvp.findAllRsvp)
app.delete('/npsItinerary', controller.rsvp.deleteOneRsvp)


app.listen(port, ()=> {
  console.log(`listening on ${port}`);
})

module.exports = app;