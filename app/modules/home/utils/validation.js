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

export function validateInvite({ title, date, description } = {}) {
  const validationErrors = {
    isEmpty: true,
    title: [],
    date: [],
    description: [],
  };
  if (
    !validator.isByteLength(title, {
      min: 1,
    })
  ) {
    let titleValidationArray = validationErrors.title;
    titleValidationArray.push('Title can not be empty.');
    validationErrors.title = titleValidationArray;
    validationErrors.isEmpty = false;
  }
  if (
    !validator.isByteLength(description, {
      min: 1,
    })
  ) {
    let descriptionValidationArray = validationErrors.description;
    descriptionValidationArray.push('Description can not be empty.');
    validationErrors.description = descriptionValidationArray;
    validationErrors.isEmpty = false;
  }

  return validationErrors;
}
