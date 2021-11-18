import { RECEIVE_QUESTIONS, ADD_QUESTION } from "../action-creator/questions";

const reducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };

    default:
      return state;
  }
};

export default reducer;
