import "./Home.css";
import Grid from "@mui/material/Grid";
import { Box, TextField, Typography } from "@mui/material";

const Home = () => {
  return (
    <Grid
      className="Home"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0}
    >
      <Grid item className="Content">
        <Typography align="center" variant="h2">
          Welcome in the best steam scanner.
        </Typography>
        <Typography align="center" variant="h4">
          Secondary title
        </Typography>
        <br /><br />
        <TextField label="search" variant="outlined" fullWidth={true} />
      </Grid>
    </Grid>
  );
};

export default Home;
