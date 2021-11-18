import { RECEIVE_QUESTIONS } from "../action-creator/questions";

const reducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    default:
      return state;
  }
};

export default reducer;
