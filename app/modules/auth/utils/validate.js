export function isEmpty(str) {
  return !str || 0 === str.length;
}

export function validateEmail(email) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (filter.test(email)) return true;

  return false;
}

export function validatePassword(password) {
  if (password.length > 5) return true;

  return false;
}

export function confirmPassword(c_password, password) {
  if (c_password === password) return true;

  return false;
}

export function validate(form) {
  console.log('form', form);
  let error = {};
  let success = true;

  var keys = Object.keys(form);

  console.log('keys', keys);
  var length = keys.length;

  keys.slice(0, length).map((field) => {
    if (field !== 'error' && field !== 'validationError') {
      var { type, value } = form[field];
      if (isEmpty(value)) {
        error[field] = 'Your ' + field + ' is required';
        success = false;
      } else {
        error[field] = '';

        if (type === 'email' && !validateEmail(value)) {
          error[field] = 'Enter a valid email address';
          success = false;
        } else if (type === 'password' && !validatePassword(value)) {
          error[field] = 'Password must be at least 6 characters';
          success = false;
        } else if (
          type === 'confirm_password' &&
          !confirmPassword(value, form['password']['value'])
        ) {
          error[field] = 'Password does not match.';
          success = false;
        }
      }
    }
  });

  return { success, error };
}
