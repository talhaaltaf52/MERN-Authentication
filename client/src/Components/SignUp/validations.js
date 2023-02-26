export const isEmpty = (value) => {
  if (!value) {
    return true;
  }
  return false;
};

export const isEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

export const isLength = (password) => {
  if (password.length < 6) {
    return true;
  }
  return false;
};

export const isMatch = (password, cf_password) => {
  if (password === cf_password) {
    return true;
  }
  return false;
};
