const Joi = require('joi');

module.exports.post = {
  body: {
    user_id:Joi.number()
      .integer()
      .label('Integer')
      .required(),
    notes_array: Joi.string()
      .label('an array of notes')
      .required(),
  }
};
