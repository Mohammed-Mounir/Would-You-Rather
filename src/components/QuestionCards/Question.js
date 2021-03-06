import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { makeStyles } from "@mui/styles";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { handleAddUserAnswer } from "../../state/action-creator/users";

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
      marginBottom: "1px",
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
  const answerFound =
    currentUserAnswered &&
    Object.keys(currentUserAnswered).find((answer) => answer === id);
  const isOptionOne =
    currentUserAnswered && currentUserAnswered[answerFound] === "optionOne";
  const isOptionTwo =
    currentUserAnswered && currentUserAnswered[answerFound] === "optionTwo";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      handleAddUserAnswer({
        authedUser,
        qid: id,
        answer: selectedOption,
      })
    );

    navigate(`/question/${id}`);
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
              <Typography color="textSecondary">{`${(
                (optionOneVotes / totalVotes) *
                100
              ).toFixed(
                1
              )}% - ${optionOneVotes} out of ${totalVotes} votes`}</Typography>
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
              <Typography color="textSecondary">{`${(
                (optionTwoVotes / totalVotes) *
                100
              ).toFixed(
                1
              )}% - ${optionTwoVotes} out of ${totalVotes} votes`}</Typography>
              <Button component={Link} to={`/`} sx={{ marginTop: "30px" }}>
                Back
              </Button>
            </CardContent>
          </Card>
        </>
      )}
      {!answerFound && (
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
                  {questionUserName} asks, Would you rather...
                </Typography>
              }
            />
            <CardContent sx={{ textAlign: "center", padding: "20px" }}>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl sx={{ display: "block", marginBottom: "20px" }}>
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

              <Button component={Link} to={`/`} sx={{ marginTop: "30px" }}>
                Back
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Question;
