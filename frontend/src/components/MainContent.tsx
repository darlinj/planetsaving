import React from "react";
import Footprint from "./Footprint";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {Grid} from "@mui/material";
import ActionsList from "./ActionsList";
const MainContent = () => {
  return (
    <>
      <Grid item xs={12} md={8}>
        <Paper
          sx={{
            padding: 1,
            justifyContent: "center",
          }}
        >
          <Footprint />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <ActionsList />
      </Grid>
    </>
  );
};

export default MainContent;
