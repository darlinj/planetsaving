import React from "react";
import TopLevelDetailSection from "./TopLevelDetailSection";
import {useParams} from "react-router-dom";
import CategoryDetail from "./CategoryDetail";
import SubCategoryDetail from "./SubCategoryDetail";
const DetailPanel = () => {
  const {category, subcategory} = useParams();
  if (subcategory) {
    return <SubCategoryDetail subCategory={subcategory} />;
  }
  if (category) {
    return <CategoryDetail category={category} />;
  }
  return <TopLevelDetailSection />;
};
export default DetailPanel;
