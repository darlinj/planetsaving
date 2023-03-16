import React from "react";
import {CategoryData} from "../types";
import DrivingForm from "./category_forms/DrivingForm";
const CategoryForm = ({categoryData}: {categoryData: CategoryData}) => {
  switch (categoryData.category) {
    case "driving":
      return <DrivingForm />;
  }
  return <></>;
};

export default CategoryForm;
