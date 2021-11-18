import { SET_AUTHED_USER } from "../action-creator/authedUser";

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;

    default:
      return state;
  }
};

export default reducer;
