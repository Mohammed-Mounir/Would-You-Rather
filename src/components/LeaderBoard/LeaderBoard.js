import { useSelector } from "react-redux";
import UserScore from "../User/UserScore";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const LeaderBoard = () => {
  const users = useSelector((state) => state.users);

  return (
    <Container>
      <Grid container spacing={3}>
        {Object.entries(users).map(([key, user]) => (
          <Grid item xs={12} md={6} lg={4} key={key}>
            <UserScore user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LeaderBoard;
