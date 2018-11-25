import validator from 'validator';

export function validateUpdatedUser({
  displayName,
  email,
  phoneNumber,
  facebook,
  twitter,
  instagram,
} = {}) {
  const validationErrors = {
    isEmpty: true,
    displayName: [],
    email: [],
    phonenumber: [],
    facebook: [],
    twitter: [],
    instagram: [],
  };

  if (!validator.isEmail(email)) {
    let emailValidationArray = validationErrors.email;
    if (
      !validator.isByteLength(email, {
        min: 1,
      })
    ) {
      emailValidationArray.push('Email can not be empty.');
    } else {
      emailValidationArray.push('Email is not on correct form.');
    }
    validationErrors['email'] = emailValidationArray;
    validationErrors['isEmpty'] = false;
  }

  if (
    !validator.isByteLength(displayName, {
      min: 1,
    })
  ) {
    let displayNameValidationArray = validationErrors.displayName;
    displayNameValidationArray.push('Display name can not be empty.');
    validationErrors['displayName'] = displayNameValidationArray;
    validationErrors['isEmpty'] = false;
  }

  return validationErrors;
}
