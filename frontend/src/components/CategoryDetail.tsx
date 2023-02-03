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
              //   <Link
              //     href={`/f/${child.category}`}
              //     id={child.category}
              //     underline="none"
              //     color="inherit"
              //   >
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
              //   </Link>
            );
          })}
      </List>
    </Paper>
  );
};

export default CategoryDetail;
