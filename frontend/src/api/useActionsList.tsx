import {useQuery} from "@tanstack/react-query";
import {request, gql} from "graphql-request";
import {ActionData} from "../types";
import backendUrl from "./backend_url";

const getActionQuery = gql`
  query GetActionsList($parentCategory: String) {
    getActionsList(parentCategory: $parentCategory) {
      id
      title
      cost
      carbonSaved
      category {
        color
      }
    }
  }
`;

type ResponseData = {
  getActionsList: [ActionData];
};

function useActionsList(parentCategory: string | undefined) {
  return useQuery<[ActionData]>(
    ["GetActionsList", parentCategory],
    async () => {
      const data = await request<ResponseData>(backendUrl, getActionQuery, {
        parentCategory: parentCategory,
      });
      return data.getActionsList;
    }
  );
}

export default useActionsList;
