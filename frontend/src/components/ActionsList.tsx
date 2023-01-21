import React from "react";
import {CircularProgress, Grid, Paper, Typography} from "@mui/material";
import SuggestedActionCard from "./SuggestedActionCard";
import useActionsList from "../api/useActionsList";
import {useParams} from "react-router-dom";
import {ActionData} from "../types";

const ActionsList = () => {
  const {category} = useParams();
  const {data, isLoading} = useActionsList(category);
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (!data) {
    return <div>No Actions</div>;
  }
  return (
    <>
      {data.map((action: ActionData) => {
        return <SuggestedActionCard action={action} key={action.id} />;
      })}
    </>
  );
};
export default ActionsList;
