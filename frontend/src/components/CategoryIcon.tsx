import React from "react";
import {CategoryData, ClimateData} from "../types";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ScienceIcon from "@mui/icons-material/Science";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import TrainIcon from "@mui/icons-material/Train";
import {grey} from "@mui/material/colors";
import {getCategoryColorArray} from "../categoryColorMap";
import {GasMeter} from "@mui/icons-material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const CategoryIcon = ({category}: {category: ClimateData}) => {
  const color = getCategoryColorArray(category.color)[category.colorIntensity];
  switch (category.category) {
    case "fertilizer": {
      return <ScienceIcon style={{color}} />;
    }
    case "meat_and_dairy": {
      return <LunchDiningIcon style={{color}} />;
    }
    case "food_transport": {
      return <LocalShippingIcon style={{color}} />;
    }
    case "packaging": {
      return <InventoryIcon style={{color}} />;
    }
    case "processing": {
      return <MiscellaneousServicesIcon style={{color}} />;
    }
    case "food_waste": {
      return <DeleteIcon style={{color}} />;
    }
    case "food_other": {
      return <MiscellaneousServicesIcon style={{color}} />;
    }
    case "misc": {
      return <MiscellaneousServicesIcon style={{color}} />;
    }
    case "all_misc": {
      return <MiscellaneousServicesIcon style={{color}} />;
    }
    case "transport": {
      return <DirectionsCarIcon style={{color}} />;
    }
    case "driving": {
      return <DirectionsCarIcon style={{color}} />;
    }
    case "flying": {
      return <AirplanemodeActiveIcon style={{color}} />;
    }
    case "train": {
      return <TrainIcon style={{color}} />;
    }
    case "other_transport": {
      return <MiscellaneousServicesIcon style={{color}} />;
    }
    case "gas": {
      return <GasMeterIcon style={{color}} />;
    }
    case "energy": {
      return <ElectricBoltIcon style={{color}} />;
    }
    case "electricity": {
      return <ElectricBoltIcon style={{color}} />;
    }
    case "government": {
      return <AssuredWorkloadIcon style={{color}} />;
    }
    case "all_gov": {
      return <AssuredWorkloadIcon style={{color}} />;
    }
    case "food": {
      return <RestaurantIcon style={{color}} />;
    }
  }
  return <MiscellaneousServicesIcon style={{color: grey[500]}} />;
};

export default CategoryIcon;
