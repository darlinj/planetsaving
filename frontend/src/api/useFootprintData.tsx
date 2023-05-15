import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {ClimateData} from "../types";
import backendUrl from "./backend_url";
import Cookie from "js-cookie";

const getClimateDataQuery = gql`
  query GetClimateData($parentCategory: String, $userId: Int) {
    getClimateData(parentCategory: $parentCategory) {
      amount(userId: $userId)
      category
      label
      color
      colorIntensity
      description
      subCategories {
        label
      }
    }
  }
`;

function useFootprintData(parentCategory: string | undefined) {
  return useQuery<[ClimateData]>(
    ["GetClimateData", parentCategory],
    async () => {
      const userIdString = Cookie.get("user-id");
      const userId = userIdString ? +userIdString : 0;
      const data = await request(backendUrl, getClimateDataQuery, {
        parentCategory,
        userId,
      });
      return data.getClimateData;
    }
  );
}

export default useFootprintData;
