import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {CategoryData} from "../types";
import backendUrl from "./backend_url";
import Cookie from "js-cookie";

const getCategoryDataQuery = gql`
  query GetCategoryData($category: String, $userId: Int) {
    getCategoryData(category: $category) {
      category
      label
      color
      colorIntensity
      description
      detailed_description
      amount(userId: $userId)
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
    const userIdString = Cookie.get("user-id");
    const userId = userIdString ? +userIdString : 0;
    const data = await request(backendUrl, getCategoryDataQuery, {
      category,
      userId,
    });
    return data.getCategoryData;
  });
}

export default useCategoryData;
