import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoginIcon from "@mui/icons-material/Login";
import LoginAvatar from "../../assets/images/Login-Avatar.png";
import { handleSetAuthedUser } from "../../state/action-creator/authedUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const UserLogin = () => {
  const users = useSelector((state) => state.users);
  console.log(users);
  const [selectedUser, setSelectedUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(handleSetAuthedUser(selectedUser));
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ maxWidth: 380, textAlign: "center" }}>
        <CardMedia
          height="290"
          component="img"
          image={LoginAvatar}
          alt="Login Avatar"
        />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Welcome to Would you rather...? App!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please sign in to continue
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "block" }}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: "15px" }}>
              <InputLabel id="demo-simple-select-label">Select User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedUser}
                label="Select User"
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                {Object.entries(users).map(([key, user]) => (
                  <MenuItem key={key} value={key}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              fullWidth
              type="submit"
              sx={{ marginBottom: "10px" }}
              variant="outlined"
              endIcon={<LoginIcon />}
            >
              Login
            </Button>
          </form>
        </CardActions>
      </Card>
    </Container>
  );
};

export default UserLogin;
