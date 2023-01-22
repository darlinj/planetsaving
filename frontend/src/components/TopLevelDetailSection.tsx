import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {orange, red, yellow, green, blue} from "@mui/material/colors";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

const TopLevelDetailSection = () => {
  return (
    <Paper
      sx={{
        padding: 1,
        height: "100%",
      }}
    >
      <Typography variant="h4" component="div" gutterBottom align="center">
        What it means
      </Typography>
      <Typography variant="body1">
        Our carbon footprint represents all the carbon dioxide and other gasses
        that damage the climate that we cause to emit as we live our lives.
        These fall in 5 main categories:
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MiscellaneousServicesIcon style={{color: orange[500]}} />
            </ListItemIcon>
            <ListItemText
              primary="Miscellaneous"
              secondary={
                <Typography component="span" variant="caption">
                  Everything else. From things you buy to leisure activities
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DirectionsCarIcon style={{color: red[500]}} />
            </ListItemIcon>
            <ListItemText
              primary="Transport"
              secondary={
                <Typography component="span" variant="caption">
                  Planes, trains and automobiles etc.
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ElectricBoltIcon style={{color: yellow[500]}} />
            </ListItemIcon>
            <ListItemText
              primary="Energy"
              secondary={
                <Typography component="span" variant="caption">
                  The gas and electricity you use in your house
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AssuredWorkloadIcon style={{color: green[500]}} />
            </ListItemIcon>
            <ListItemText
              primary="Schools and Hospitals"
              secondary={
                <Typography component="span" variant="caption">
                  All government activities including schools, hospitals, the
                  army etc
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RestaurantIcon style={{color: blue[500]}} />
            </ListItemIcon>
            <ListItemText
              primary="Food"
              secondary={
                <Typography component="span" variant="caption">
                  All the carbon emited from the growing, processing and
                  transport of your food
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Typography variant="body1">
        Click on each section to see how it is made up.{" "}
      </Typography>
    </Paper>
  );
};

export default TopLevelDetailSection;
