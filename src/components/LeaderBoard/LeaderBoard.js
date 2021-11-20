import { useSelector } from "react-redux";
import UserScore from "../User/UserScore";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const LeaderBoard = () => {
  const users = useSelector((state) => state.users);

  const sortedUsersArr = Object.entries(users)
    .map(([_, user]) => {
      const score = Object.keys(user.answers).length + user.questions.length;
      return { ...user, score };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <Container>
      <Grid container spacing={3}>
        {sortedUsersArr.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user.id}>
            <UserScore user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LeaderBoard;
