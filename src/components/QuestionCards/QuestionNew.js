import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../../state/action-creator/questions";

const QuestionNew = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionOneError, setOptionOneError] = useState(false);
  const [optionTwoError, setOptionTwoError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOptionOneError(false);
    setOptionTwoError(false);

    if (optionOne === "") {
      setOptionOneError(true);
    }
    if (optionTwo === "") {
      setOptionTwoError(true);
    }
    if (optionOne && optionTwo) {
      await dispatch(handleAddQuestion(optionOne, optionTwo));
      navigate("/");
    }
  };

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Question
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Would you rather...
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setOptionOne(e.target.value)}
          label="Enter Option One Here"
          variant="outlined"
          color="primary"
          fullWidth
          required
          error={optionOneError}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          onChange={(e) => setOptionTwo(e.target.value)}
          label="Enter Option Two Here"
          variant="outlined"
          color="primary"
          fullWidth
          required
          error={optionTwoError}
          sx={{ marginBottom: "20px" }}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<ArrowForwardIosOutlinedIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default QuestionNew;
