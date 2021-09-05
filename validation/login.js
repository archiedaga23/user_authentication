const isEmpty = require('./isEmpty');

module.exports = registerValidation = (data) => {
  let errors = {};

  if (isEmpty(data.username)) {
    errors.username = 'Username is Required...';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password is Required...';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}