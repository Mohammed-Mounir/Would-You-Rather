import { combineReducers } from "redux";
import authedUserReducer from "./authedUserReducer";
import usersReducer from "./usersReducers";
import questionsReducer from "./questionsReducer";

const reducers = combineReducers({
  users: usersReducer,
  authedUser: authedUserReducer,
  questions: questionsReducer,
});

export default reducers;
