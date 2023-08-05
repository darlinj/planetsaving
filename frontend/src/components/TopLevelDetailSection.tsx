import React from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import {useParams} from "react-router-dom";
import useFootprintData from "../api/useFootprintData";
import CategoryIcon from "./CategoryIcon";

const TopLevelDetailSection = () => {
  const {category} = useParams();
  const {status, data, isLoading, isError, error} = useFootprintData(category);
  if (isLoading) {
    return (
      <div>
        <CircularProgress role="progressbar" />
      </div>
    );
  }
  if (isError && error instanceof Error) {
    return <div>{error.message}</div>;
  }
  if (!data) {
    return <div>No data returned... {status}</div>;
  }
  return (
    <Paper
      sx={{
        padding: 1,
        height: "100%",
      }}
    >
      <Typography variant="h4" component="div" gutterBottom align="center">
        What it means
      </Typography>
      <Typography variant="body1">
        Our carbon footprint represents all the carbon dioxide and other gasses
        that damage the climate that we cause to emit as we live our lives.
        These fall in 5 main categories:
      </Typography>
      <List>
        {data &&
          data.map((child) => {
            return (
              <ListItem disablePadding key={child.category}>
                <Link
                  href={`/f/${child.category}`}
                  id={child.category}
                  underline="none"
                  color="inherit"
                >
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
                </Link>
              </ListItem>
            );
          })}
      </List>
      <Typography variant="body1">
        Click on each section to see how it is made up.{" "}
      </Typography>
    </Paper>
  );
};

export default TopLevelDetailSection;
