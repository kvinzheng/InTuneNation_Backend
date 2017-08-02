
const Joi = require('joi');

 module.exports.post = {
  body: {
    email: Joi.string()
      .label('Email')
      .required()
      .email()
      .trim(),

    password: Joi.string()
      .label('Password')
      .required()
      .min(8)
      // .trim()
  }
};
