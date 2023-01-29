import React from "react";
import useCategoryData from "../api/useCategoryData";
import {CircularProgress} from "@mui/material";
const CategoryDetail = ({category}: {category: string}) => {
  const {data, isLoading} = useCategoryData(category);
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  return <div>{data?.label}</div>;
};

export default CategoryDetail;
