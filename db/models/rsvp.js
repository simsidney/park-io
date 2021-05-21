const mongoose = require('mongoose');

const rsvpSchema = mongoose.Schema({
  username: String,
  email: String,
  park: String,
  campsite: String,
  startDate: Date,
  endDate: Date
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);


module.exports = {Rsvp,
  updateRSVP: async (rsvp) => {
    const filter = {username: rsvp.username, email: rsvp.email, startDate: rsvp.startDate, endDate: rsvp.endDate}
    const newData = rsvp
    return await Rsvp.updateOne(filter, newData, {upsert: true})
  },

  getRSVP: async (email) => {
    return await Rsvp.find({email: email}).sort({startDate: 1})
  },

  deleteRSVP: async (event) => {
    return await Rsvp.deleteOne({
      username: event.username,
      email: event.email,
      park: event.park,
      campsite: event.campsite,
      startDate: event.startDate,
      endDate: event.endDate
    })
  }
};
