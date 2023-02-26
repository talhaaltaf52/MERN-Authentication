
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
