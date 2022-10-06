import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ImpactWell = ({text, color}: {text: string; color: string}) => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        margin: 1,
        display: "flex",
        justifyContent: "center",
        width: 100,
        backgroundColor: color,
      }}
    >
      <Typography
        color="black"
        variant="body1"
        sx={{
          fontSize: 10,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default ImpactWell;
