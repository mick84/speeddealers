export const changeControlledInput = (event, state, callback) => {
  return callback((state) => ({
    ...state,
    [event.target.name]: event.target.value,
  }));
};
