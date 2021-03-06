const isEmpty = require('./isEmpty');

module.exports = registerValidation = (data) => {
  let errors = {};

  if (isEmpty(data.username)) {
    errors.username = 'Username is Required...';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password is Required...';
  }

  if (isEmpty(data.firstname)) {
    errors.firstname = 'first Name is Required...';
  }

  if (isEmpty(data.lastname)) {
    errors.lastname = 'Last Name is Required...';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}