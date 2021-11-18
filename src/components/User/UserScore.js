import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red, blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const CardText = styled("p")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: blue[400],
  textAlign: "center",
  padding: theme.spacing(1),
  color: "white",
}));

const UserScore = (props) => {
  const { id, name, avatarURL, answers, questions } = props.user;
  const numOfAnswers = Object.keys(answers).length;
  const numOfQuestions = questions.length;
  const score = numOfAnswers + numOfQuestions;

  return (
    <Card elevation={1} sx={{ marginBottom: "20px" }}>
      <CardHeader
        avatar={<Avatar alt={`Photo of ${name}`} src={avatarURL} />}
        action={<Avatar sx={{ bgcolor: red[900] }}>{score}</Avatar>}
        title={name}
      />
      <CardContent>
        <CardText>{numOfAnswers} Answered Questions!</CardText>
        <CardText>{numOfQuestions} Created Questions!</CardText>
        <CardText sx={{ bgcolor: red[500] }}>
          {name.split(" ")[0]} Scored {score} Points!
        </CardText>
      </CardContent>
    </Card>
  );
};

export default UserScore;
