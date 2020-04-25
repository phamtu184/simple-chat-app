const loginFormReducer = (state = true, action) => {
  switch (action.type) {
    case "LOGIN_FORM":
      return (state = true);
    case "REGISTER_FORM":
      return (state = false);
    default:
      return state;
  }
};
export default loginFormReducer;
