import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleInitialData } from "../../state/index";
import Layout from "../Layout/Layout";
import Dashboard from "../Dashboard/Dashboard";
import QuestionNew from "../QuestionCards/QuestionNew";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import Question from "../QuestionCards/Question";
import UserLogin from "../User/UserLogin";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/new" element={<QuestionNew />} />
          <Route path="/leader-board" element={<LeaderBoard />} />
          <Route path="/question/:id" element={<Question />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
