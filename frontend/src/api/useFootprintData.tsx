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

const getData = async (parentCategory: string | undefined) => {
  const userIdString = Cookie.get("user-id");
  const userId = userIdString ? +userIdString : 0;
  const data = await request(backendUrl, getClimateDataQuery, {
    parentCategory,
    userId,
  });
  return data.getClimateData;
};

function useFootprintData(parentCategory: string | undefined) {
  return useQuery<[ClimateData]>({
    queryKey: ["GetClimateData", parentCategory],
    queryFn: () => getData(parentCategory),
  });
}

export default useFootprintData;
