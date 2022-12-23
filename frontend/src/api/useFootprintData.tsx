import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {ClimateData} from "../types";
import backendUrl from "./backend_url";

const getClimateDataQuery = gql`
  query GetClimateData($parentCategory: String) {
    getClimateData(parentCategory: $parentCategory) {
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

function useFootprintData(parentCategory: string | undefined) {
  return useQuery<[ClimateData]>(
    ["GetClimateData", parentCategory],
    async () => {
      const data = await request(backendUrl, getClimateDataQuery, {
        parentCategory: parentCategory,
      });
      return data.getClimateData;
    }
  );
}

export default useFootprintData;
