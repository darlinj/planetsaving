import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {ClimateData} from "../types";
import backendUrl from "./backend_url";

function useFootprintData() {
  return useQuery<[ClimateData]>(["GetClimateData"], async () => {
    const data = await request(
      backendUrl,
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
