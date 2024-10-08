import React from "react";
import Footprint from "./Footprint";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography } from "@mui/material";
import ActionsList from "./ActionsList";
import DetailPanel from "./DetailPanel";
const MainContent = () => {
  return (
    <>
      <Grid container spacing={2} id="main-content">
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              padding: 1,
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Footprint />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} id="detail">
          <DetailPanel />
        </Grid>
      </Grid>
    </>
  );
};

export default MainContent;
