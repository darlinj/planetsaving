import React from "react";
import useCategoryData from "../api/useCategoryData";
import {CircularProgress} from "@mui/material";
const CategoryDetail = ({category}: {category: string}) => {
  const {data, isLoading} = useCategoryData(category);
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    );
  }
  if (!data) {
    return <div>No category data found</div>;
  }
  return (
    <div>
      {data.label}
      <ul>
        {data.children &&
          data.children.map((child) => {
            return <li key={child.category}>{child.label}</li>;
          })}
      </ul>
    </div>
  );
};

export default CategoryDetail;
