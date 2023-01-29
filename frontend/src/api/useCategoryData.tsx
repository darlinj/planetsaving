import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {CategoryData} from "../types";
import backendUrl from "./backend_url";

const getCategoryDataQuery = gql`
  query GetCategoryData($parentCategory: String) {
    getCategoryData(parentCategory: $parentCategory) {
      amount
      category
      label
      color
      colorIntensity
      subCategories {
        label
      }
    }
  }
`;

function useCategoryData(category: string | undefined) {
  console.log("getting:", category);
  return useQuery<CategoryData>(["GetCategoryData", category], async () => {
    const data = await request(backendUrl, getCategoryDataQuery, {
      category: category,
    });
    return data.getCategoryData;
  });
}

export default useCategoryData;
