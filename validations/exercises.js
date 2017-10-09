const Joi = require('joi');

module.exports.post = {
  body: {
    notes_array: Joi.array()
      .label('an array of notes')
      .required(),
  },
};
