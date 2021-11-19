import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { makeStyles } from "@mui/styles";
import { red, blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddAnswer } from "../../state/action-creator/questions";

const CardText = styled("p")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: blue[500],
  textAlign: "center",
  padding: theme.spacing(1),
  color: "white",
}));

const useStyles = makeStyles((theme) => {
  return {
    ribbonParent: {
      position: "relative",
    },
    ribbon: {
      backgroundColor: "red",
      position: "absolute",
      width: 30,
      borderRadius: "50%",
      zIndex: 3,
      textAlign: "center",
      textTransform: "uppercase",
      padding: 5,
      font: "Lato",
      fontWeight: "bold",
      transform: "rotate(30deg)",
      top: -20,
      right: -17,
      fontSize: "10px",
    },
  };
});

const Question = () => {
  const { users, authedUser, questions } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState("optionOne");
  const currentUser = users[authedUser];
  const currentUserAnswered = currentUser?.answers;
  const question = questions && questions[id];
  const questionUserName = users[question?.author]?.name;
  const questionUserImage = users[question?.author]?.avatarURL;
  const optionOneText = question?.optionOne.text;
  const optionTwoText = question?.optionTwo.text;
  const optionOneVotes = question?.optionOne.votes.length;
  const optionTwoVotes = question?.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  console.log(question && question);
  console.log(currentUserAnswered && currentUserAnswered);
  console.log(currentUserAnswered && Object.keys(currentUserAnswered));

  const answerFound =
    currentUserAnswered &&
    Object.keys(currentUserAnswered).find((answer) => answer === id);
  console.log(
    currentUserAnswered && question[currentUserAnswered[answerFound]]?.text
  );

  const isOptionOne =
    currentUserAnswered && currentUserAnswered[answerFound] === "optionOne";
  const isOptionTwo =
    currentUserAnswered && currentUserAnswered[answerFound] === "optionTwo";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedOption);
    await dispatch(
      handleAddAnswer({
        authedUser,
        qid: id,
        answer: selectedOption,
      })
    );
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      {answerFound && (
        <>
          <Card
            className={classes.card}
            elevation={1}
            sx={{ marginTop: "20px" }}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt={`Photo of ${questionUserName}`}
                  src={questionUserImage}
                />
              }
              title={
                <Typography variant="h6" sx={{ color: "#808080" }}>
                  {`Asked by ${questionUserName}`}
                </Typography>
              }
            />
            <CardContent sx={{ textAlign: "center", padding: "20px" }}>
              <Typography color="textSecondary">Would you rather...</Typography>
              <CardText className={classes.ribbonParent}>
                {question?.optionOne.text}?
                {isOptionOne && (
                  <Typography component={"span"} className={classes.ribbon}>
                    Your Vote
                  </Typography>
                )}
              </CardText>
              <CardText sx={{ bgcolor: "white", color: "#808080" }}>
                OR
              </CardText>
              <CardText className={classes.ribbonParent}>
                {question?.optionTwo.text}?
                {isOptionTwo && (
                  <Typography component={"span"} className={classes.ribbon}>
                    Your Vote
                  </Typography>
                )}
              </CardText>
            </CardContent>
          </Card>
        </>
      )}
      {!answerFound && (
        <>
          <Typography
            variant="h6"
            color="textSecondary"
            component="h2"
            gutterBottom
          >
            Would you rather...
          </Typography>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl sx={{ display: "block", marginBottom: "20px" }}>
              {/* <FormLabel>Would you rather...</FormLabel> */}
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <FormControlLabel
                  value="optionOne"
                  control={<Radio />}
                  label={optionOneText}
                />
                <FormControlLabel
                  value="optionTwo"
                  control={<Radio />}
                  label={optionTwoText}
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<ArrowForwardIosOutlinedIcon />}
            >
              Submit Your Answer
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default Question;
