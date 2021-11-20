import QuestionView from "../QuestionCards/QuestionView";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Dashboard = () => {
  const { users, authedUser, questions } = useSelector((state) => state);
  const [selectedTab, setSelectedTab] = useState(0);

  const currentUser = users[authedUser];
  const currentUserAnswered = currentUser?.answers;

  const unAnsweredQuestions =
    currentUserAnswered &&
    Object.entries(questions)
      .filter(
        ([_, { id: questionID }]) =>
          !Object.keys(currentUserAnswered).some(
            (answeredQuestionID) => answeredQuestionID === questionID
          )
      )
      .sort((a, b) => b[1].timestamp - a[1].timestamp);

  const answeredQuestions =
    currentUserAnswered &&
    Object.entries(questions)
      .filter(([_, { id: questionID }]) =>
        Object.keys(currentUserAnswered).some(
          (answeredQuestionID) => answeredQuestionID === questionID
        )
      )
      .sort((a, b) => b[1].timestamp - a[1].timestamp);

  const handleChange = (evt, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Unanswered Questions" />
          <Tab label="Answered Questions" />
        </Tabs>
      </Box>

      <Container>
        <Grid container spacing={3} justifyContent="center">
          {selectedTab === 0 &&
            unAnsweredQuestions?.map((question) => (
              <Grid item xs={8} key={question[0]}>
                <QuestionView question={question[1]} />
              </Grid>
            ))}

          {selectedTab === 1 &&
            answeredQuestions?.map((question) => (
              <Grid item xs={8} key={question[0]}>
                <QuestionView question={question[1]} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
