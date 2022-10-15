import React from "react";
import {Paper, Typography} from "@mui/material";
import SuggestedActionCard from "./SuggestedActionCard";
import {ActionData} from "../types";

const actionData: ActionData[] = [
  {
    id: 123,
    actionTitle: "Reduce your thermostat by one degree",
    cost: 0,
    carbonSaved: 0.3,
    actionType: "energy",
  },
  {
    id: 124,
    actionTitle: "Buy an electric car",
    cost: 30000,
    carbonSaved: 1.0,
    actionType: "transport",
  },
  {
    id: 125,
    actionTitle: "Stop buying air freighted food",
    cost: 0,
    carbonSaved: 0.3,
    actionType: "food",
  },
  {
    id: 126,
    actionTitle: "Buy more second hand things",
    cost: 0,
    carbonSaved: 0.4,
    actionType: "purchasing",
  },
];

const ActionsList = () => {
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
