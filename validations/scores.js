const Joi = require('joi');

module.exports.post = {
  body: {
    scores_array: Joi.string()
      .label('an array of score')
      .required(),
    avg_score: Joi.number()
      .required()
  }
};
