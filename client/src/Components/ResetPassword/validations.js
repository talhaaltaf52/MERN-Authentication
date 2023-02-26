export const isEmpty = (value) => {
  if (!value) {
    return true;
  }
  return false;
};


export const isLength = (password) => {
  if (password.length < 6) {
    return true;
  }
  return false;
};
