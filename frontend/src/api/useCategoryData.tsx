import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {CategoryData} from "../types";
import backendUrl from "./backend_url";

const getCategoryDataQuery = gql`
  query GetCategoryData($category: String) {
    getCategoryData(category: $category) {
      category
      label
      color
      colorIntensity
      description
      detailed_description
      children {
        category
        label
        color
        colorIntensity
        description
        detailed_description
      }
    }
  }
`;

function useCategoryData(category: string | undefined) {
  return useQuery<CategoryData>(["GetCategoryData", category], async () => {
    const data = await request(backendUrl, getCategoryDataQuery, {
      category: category,
    });
    return data.getCategoryData;
  });
}

export default useCategoryData;
