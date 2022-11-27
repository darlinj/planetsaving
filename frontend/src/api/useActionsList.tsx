import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {ActionData} from "../types";
import backendUrl from "./backend_url";

function useActionsList() {
  return useQuery<[ActionData]>(["GetActionsList"], async () => {
    const data = await request(
      backendUrl,
      gql`
        query GetActionsList {
          getActionsList {
            id
            title
            cost
            carbonSaved
            type
          }
        }
      `
    );
    return data.getActionsList;
  });
}

export default useActionsList;
