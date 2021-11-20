export const SET_AUTHED_USER = "SET_AUTHED_USER";

export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

export const handleSetAuthedUser = (userID) => {
  return (dispatch) => {
    dispatch(setAuthedUser(userID));
  };
};
