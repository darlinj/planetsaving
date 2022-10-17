import {GraphQLHandler} from "msw";

import actionList from "./actionList";
import climateData from "./climateData";

const graphQLHandlers: GraphQLHandler[] = [actionList, climateData];

export const handlers = [...graphQLHandlers];
