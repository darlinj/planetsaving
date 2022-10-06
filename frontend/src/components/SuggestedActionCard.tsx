import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {ActionData} from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {green, red, blue, orange, yellow} from "@mui/material/colors";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ImpactWell from "./ImpactWell";

const categoryColorMap = {
  energy: yellow,
  transport: orange,
  food: blue,
  government: green,
  purchasing: red,
};

const SuggestedActionCard = ({action}: {action: ActionData}) => {
  const colorArray = categoryColorMap[action.actionType];
  return (
    <Card
      sx={{
        borderRadius: "16px",
        backgroundColor: colorArray[500],
        marginBottom: 2,
      }}
    >
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              sx={{color: colorArray[800], backgroundColor: colorArray[300]}}
            >
              <LocalFireDepartmentIcon />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{color: colorArray[800]}}>
              <FavoriteIcon />
            </IconButton>
          }
          title={action.actionTitle}
          sx={{paddingBottom: 0}}
        />
        <CardContent sx={{paddingTop: 0}}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <ImpactWell color={colorArray[800]} text={`Cost=£${action.cost}`} />
            <ImpactWell
              color={colorArray[800]}
              text={`CO2 saved=${action.carbonSaved}T`}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="button">Learn More</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SuggestedActionCard;
