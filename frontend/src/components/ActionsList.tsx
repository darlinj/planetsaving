import React from "react";
import {Paper, Typography} from "@mui/material";
import SuggestedActionCard from "./SuggestedActionCard";
import {ActionData} from "../types";

const ActionsList = ({actionData}: {actionData: ActionData[]}) => {
  return (
    <Paper
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 2,
      }}
      id="actions"
    >
      <Typography variant="h4" component="div" gutterBottom align="center">
        Top actions you can take
      </Typography>
      {actionData.map((action) => {
        return <SuggestedActionCard action={action} key={action.id} />;
      })}
    </Paper>
  );
};
export default ActionsList;
