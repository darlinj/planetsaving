import React from "react";
import {
  CircularProgress,
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
} from "@mui/material";
import useCategoryData from "../api/useCategoryData";
import CategoryIcon from "./CategoryIcon";
import ComponentForm from "./CategoryForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Typography
        sx={{paddingTop: 2}}
        position={"absolute"}
        bottom={"25%"}
        variant="body1"
      >
        <Button onClick={handleOpen}>
          {data.label} emissions: {data.amount.toFixed(2)} Tons
        </Button>
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Calculation details
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            Total is {data.amount.toFixed(2)}
          </Typography>
        </Box>
      </Modal>
    </Paper>
  );
};

export default SubCategoryDetail;
