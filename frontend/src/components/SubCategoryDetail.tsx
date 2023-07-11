import React from "react";
import {
  CircularProgress,
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Link,
  ListItemIcon,
  ListItemText,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useCategoryData from "../api/useCategoryData";
import CategoryIcon from "./CategoryIcon";
import ComponentForm from "./CategoryForm";
import LaunchIcon from "@mui/icons-material/Launch";

const SubCategoryDetail = ({subCategory}: {subCategory: string}) => {
  const {data, isLoading} = useCategoryData(subCategory);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <CategoryIcon category={data} />
        <Typography variant="h5" align="center" sx={{paddingLeft: 3}}>
          {data.label}
        </Typography>
      </Box>
      <Box sx={{flexGrow: 1}}>
        <Divider sx={{paddingTop: 1}} />
        <Typography sx={{paddingTop: 2}} variant="body1">
          {data.detailed_description}
        </Typography>
        <ComponentForm categoryData={data} />
      </Box>
      <Typography sx={{paddingTop: 2}} bottom={"25%"} variant="body1">
        <Button id={`${data.category}-total`} onClick={handleOpen}>
          {data.label} emissions: {data.amount.toFixed(2)} Tons
        </Button>
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Calculation dialog"
        aria-describedby="How this figure was worked out"
      >
        <DialogTitle>How this figure was worked out</DialogTitle>
        <DialogContent>
          <Box sx={{backgroundColor: "#f5f5f5", borderRadius: 3, padding: 2}}>
            <Typography>Calculation</Typography>{" "}
            <Typography variant="caption">
              How the total was calculated
            </Typography>
            <Typography id="footprint-driving-calculation" sx={{mt: 2}}>
              {data.calculation}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 3,
              padding: 2,
              marginTop: 1,
            }}
          >
            <Typography>References</Typography>{" "}
            <Typography variant="caption">
              Where we got the source data
            </Typography>
            {data.referenceUrls &&
              data.referenceUrls.map((ref) => {
                return (
                  <Link
                    key={data.category}
                    href={ref.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon>
                      <LaunchIcon />
                    </ListItemIcon>
                    <ListItemText primary={ref.label} />
                  </Link>
                );
              })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SubCategoryDetail;
