import React from "react";
import {Paper, Typography} from "@mui/material";
import SuggestedActionCard from "./SuggestedActionCard";
import useActionsList from "../api/useActionsList";
import {useParams} from "react-router-dom";

const ActionsList = () => {
  const {category} = useParams();
  const {data, isLoading} = useActionsList(category);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No Actions</div>;
  }
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
      {data.map((action) => {
        return <SuggestedActionCard action={action} key={action.id} />;
      })}
    </Paper>
  );
};
export default ActionsList;
