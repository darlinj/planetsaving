import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {ClimateData} from "../types";

const endpoint = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : "https://example.com/api";

function useFootprintData() {
  return useQuery<[ClimateData]>(["GetClimateData"], async () => {
    const data = await request(
      endpoint,
      gql`
        query GetClimateData {
          getClimateData {
            amount
            color
            label
          }
        }
      `
    );
    return data.getClimateData;
  });
}

export default useFootprintData;
