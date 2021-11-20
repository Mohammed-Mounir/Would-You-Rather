import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleInitialData } from "../../state/index";
import Layout from "../Layout/Layout";
import Dashboard from "../Dashboard/Dashboard";
import QuestionNew from "../QuestionCards/QuestionNew";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import Question from "../QuestionCards/Question";
import UserLogin from "../User/UserLogin";
import ProtectedRoute from "../ProtectedRoute";
import NotFound from "../404";
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
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <QuestionNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:id"
            element={
              <ProtectedRoute>
                <Question />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
