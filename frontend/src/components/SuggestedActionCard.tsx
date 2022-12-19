import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  Box,
  Icon,
  Typography,
} from "@mui/material";
import {ActionData} from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ImpactWell from "./ImpactWell";
import {getCategoryColorArray} from "../categoryColorMap";

const SuggestedActionCard = ({action}: {action: ActionData}) => {
  const colorArray = getCategoryColorArray(
    action.category ? action.category.color : action.category
  );
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
            <Icon aria-label="settings" sx={{color: colorArray[800]}}>
              <FavoriteIcon />
            </Icon>
          }
          title={action.title}
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
