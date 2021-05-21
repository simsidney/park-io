const model = require('../models');

module.exports = {
  findRsvpAndUpdate: async (req, res) => {
    await model.rsvp.updateRSVP(req.body)
      .then(() => {
        res.status(201).send();
      })
  },

  findAllRsvp: async (req, res) => {
    const data = await model.rsvp.getRSVP(req.query.email);
    res.status(200).send(data);
  },

  deleteOneRsvp: async (req, res) => {
    await model.rsvp.deleteRSVP(req.query);
    res.status(204).send()
  }
}