import React from "react";
import TopLevelDetailSection from "./TopLevelDetailSection";
import {useParams} from "react-router-dom";
import CategoryDetail from "./CategoryDetail";
const DetailPanel = () => {
  const {category} = useParams();
  if (category) {
    return <CategoryDetail category={category} />;
  }
  return <TopLevelDetailSection />;
};
export default DetailPanel;
