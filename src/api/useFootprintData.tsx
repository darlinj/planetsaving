import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {ClimateData} from "../types";

const endpoint = "https://example.com/api";

function useFootprintData() {
  return useQuery<[ClimateData]>(["GetClimateData"], async () => {
    const data = await request(
      endpoint,
      gql`
        query GetClimateData {
          climateData {
            amount
            subSection
            color
            label
          }
        }
      `
    );
    return data.climateData;
  });
}

export default useFootprintData;
