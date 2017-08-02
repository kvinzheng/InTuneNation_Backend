const Joi = require('joi');

module.exports.post = {
  body: {
    scores_array: Joi.array()
      .label('an array of score')
      .required(),
    avg_score: Joi.number()
      .required()
  }
};
