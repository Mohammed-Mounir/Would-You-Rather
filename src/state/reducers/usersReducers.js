import { RECEIVE_USERS } from "../action-creator/users";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    default:
      return state;
  }
};

export default reducer;
