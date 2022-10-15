import React from "react";
import "./App.css";
import {green, red, blue, orange, yellow} from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {ActionData} from "./types";
import Footprint from "./components/Footprint";
import ActionsList from "./components/ActionsList";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          id="page-title"
          variant="h2"
          component="div"
          gutterBottom
          align="center"
        >
          Planet saving expert
        </Typography>
        <Typography variant="body1" component="div" gutterBottom align="center">
          Want to do your bit to help save the planet? Here you can visualize
          your carbon footprint and get practical suggestions about how you can
          reduce your impact on the planet.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper
          sx={{
            padding: 1,
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="div" gutterBottom align="center">
            Annual Carbon footprint of the average UK citizen
          </Typography>
          <Footprint />
          <Typography variant="h4" component="div" gutterBottom>
            Total 10.6 Tons of CO2 equivalent
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <ActionsList />
      </Grid>
    </Grid>
  );
}

export default App;
