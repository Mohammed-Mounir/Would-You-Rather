import { saveQuestion, saveQuestionAnswer } from "../../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

const addQuestion = (question) => {
  return (dispatch) => {
    dispatch({
      type: ADD_QUESTION,
      question,
    });
  };
};

export const handleAddQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
    });
  };
};

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const addAnswer = ({ authedUser, qid, answer }) => {
  return (dispatch) => {
    dispatch({
      type: ADD_ANSWER,
      authedUser,
      qid,
      answer,
    });
  };
};

export const handleAddAnswer = (answeredQuestion) => {
  return (dispatch) => {
    // dispatch(addAnswer(answeredQuestion));

    // return saveQuestionAnswer(answeredQuestion).catch((e) => {
    //   console.warn("Error in handleAddAnswer: ", e);
    //   dispatch(addAnswer(answeredQuestion));
    //   alert("The was an error adding your answer. Try again.");
    // });

    return saveQuestionAnswer(answeredQuestion)
      .then(() => {
        dispatch(addAnswer(answeredQuestion));
      })
      .catch((e) => {
        console.warn("Error in handleAddAnswer: ", e);
        dispatch(addAnswer(answeredQuestion));
        alert("The was an error adding your answer. Try again.");
      });
  };
};
