import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

const NotFound = () => {
  return (
    <Box sx={{ width: "100%", textAlign: "center" }} color={red[500]}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h2" gutterBottom>
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
