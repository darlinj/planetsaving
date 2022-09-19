import {graphql} from "msw";
import {green, red, blue, orange, yellow} from "@mui/material/colors";

export const handlers = [
  graphql.query("GetClimateData", (req, res, ctx) => {
    return res(
      ctx.data({
        climateData: [
          {
            amount: 3.2,
            subSection: null,
            color: red[500],
            label: "Things you buy",
          },
          {
            amount: 2.4,
            subSection: null,
            color: orange[500],
            label: "Transport",
          },
          {amount: 2, subSection: null, color: yellow[500], label: "Energy"},
          {
            amount: 1.1,
            subSection: null,
            color: green[500],
            label: "Schools and hospitals",
          },
          {amount: 1.9, subSection: null, color: blue[500], label: "Food"},
        ],
      })
    );
  }),
];
