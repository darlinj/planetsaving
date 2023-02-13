import React from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Link,
  Typography,
} from "@mui/material";
import useCategoryData from "../api/useCategoryData";
import CategoryIcon from "./CategoryIcon";
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
      <List>
        <ListItem disablePadding key={data.category}>
          <ListItemButton>
            <ListItemIcon>
              <CategoryIcon category={data} />
            </ListItemIcon>
            <ListItemText
              primary={data.label}
              secondary={
                <Typography component="span" variant="caption">
                  {data.description}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default SubCategoryDetail;
