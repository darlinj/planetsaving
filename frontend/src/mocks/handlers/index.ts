import {GraphQLHandler} from "msw";

import actionList from "./actionList";
import climateData from "./climateData";
import categoryDetail from "./categoryDetail";

const graphQLHandlers: GraphQLHandler[] = [
  actionList,
  climateData,
  categoryDetail,
];

export const handlers = [...graphQLHandlers];
