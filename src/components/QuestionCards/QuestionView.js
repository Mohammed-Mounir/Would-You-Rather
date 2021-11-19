import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { red, blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CardText = styled("p")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: blue[500],
  textAlign: "center",
  padding: theme.spacing(1),
  color: "white",
}));

const QuestionView = (props) => {
  const users = useSelector((state) => state.users);

  const { id, author, timestamp, optionOne, optionTwo } = props.question;
  const questionUserName = users[author]?.name;
  const questionUserImage = users[author]?.avatarURL;

  return (
    <Card elevation={1} sx={{ marginTop: "20px" }}>
      <CardHeader
        avatar={
          <Avatar
            alt={`Photo of ${questionUserName}`}
            src={questionUserImage}
          />
        }
        title={
          <Typography variant="h6" sx={{ color: "#808080" }}>
            {`${questionUserName} asks would you rather..`}
          </Typography>
        }
      />
      <CardContent sx={{ textAlign: "center" }}>
        <CardText>{optionOne.text}?</CardText>
        <CardText sx={{ bgcolor: "white", color: "#808080" }}>OR</CardText>
        <CardText>{optionTwo.text}?</CardText>
        <Button
          component={Link}
          to={`/question/${id}`}
          sx={{ width: "100%", marginTop: "10px" }}
          variant="outlined"
        >
          View Question
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestionView;
