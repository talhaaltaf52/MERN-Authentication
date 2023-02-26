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

