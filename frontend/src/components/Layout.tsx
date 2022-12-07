import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Outlet} from "react-router-dom";
const Layout = () => {
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
      <Outlet />
    </Grid>
  );
};
export default Layout;
