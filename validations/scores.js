const Joi = require('joi');

module.exports.post = {
  body: {
    user_id:Joi.number()
      .integer()
      .label('Integer')
      .required(),
    exercises_id: Joi.number()
      .integer()
      .label('Integer')
      .required(),
    scores_array: Joi.string()
      .label('an array of score')
      .required(),
    avg_score: Joi.number()
      .required()
  }
};
