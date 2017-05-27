const Joi = require('joi');

module.exports.post = {
  body: {
    notes_array: Joi.string()
      .label('an array of notes')
      .required(),
  }
};
