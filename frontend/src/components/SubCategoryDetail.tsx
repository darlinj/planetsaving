import React from "react";
import {CircularProgress, Paper, Typography, Box, Divider} from "@mui/material";
import useCategoryData from "../api/useCategoryData";
import CategoryIcon from "./CategoryIcon";
import ComponentForm from "./CategoryForm";
const SubCategoryDetail = ({subCategory}: {subCategory: string}) => {
  const {data, isLoading} = useCategoryData(subCategory);
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        Loading...
      </div>
    );
  }
  if (!data) {
    return <div>No sub category data found</div>;
  }
  return (
    <Paper
      sx={{
        padding: 1,
        height: "100%",
      }}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <CategoryIcon category={data} />
        <Typography variant="h5" align="center" sx={{paddingLeft: 3}}>
          {data.label}
        </Typography>
      </Box>
      <Divider sx={{paddingTop: 1}} />
      <Typography sx={{paddingTop: 2}} variant="body1">
        {data.detailed_description}
      </Typography>
      <ComponentForm categoryData={data} />
    </Paper>
  );
};

export default SubCategoryDetail;
