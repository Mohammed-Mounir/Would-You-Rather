import { addAnswer } from "./questions";
import { saveQuestionAnswer } from "../../utils/api";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const addUserQuestion = ({ id, author }) => {
  return {
    type: ADD_USER_QUESTION,
    id,
    author,
  };
};

const addUserAnswer = ({ authedUser, qid, answer }) => {
  return {
    type: ADD_USER_ANSWER,
    authedUser,
    qid,
    answer,
  };
};

export const handleAddUserAnswer = (answeredQuestion) => {
  return (dispatch) => {
    dispatch(addUserAnswer(answeredQuestion));
    dispatch(addAnswer(answeredQuestion));

    return saveQuestionAnswer(answeredQuestion).catch((e) => {
      console.warn("Error in handleAddAnswer: ", e);
      dispatch(addAnswer(answeredQuestion));
      alert("The was an error adding your answer. Try again.");
    });
  };
};
