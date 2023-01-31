import React from "react";
import useCategoryData from "../api/useCategoryData";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {orange} from "@mui/material/colors";
import CategoryIcon from "./CategoryIcon";
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
    <Paper
      sx={{
        padding: 1,
        height: "100%",
      }}
    >
      <List>
        {data.children &&
          data.children.map((child) => {
            return (
              <ListItem disablePadding key={child.category}>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon category={child} />
                  </ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    secondary={
                      <Typography component="span" variant="caption">
                        {child.description}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
};

export default CategoryDetail;
