import {graphql} from "msw";

export default graphql.query("GetClimateData", (req, res, ctx) => {
  return res(
    ctx.data({
      getClimateData: [
        {
          id: 122,
          amount: 3.2,
          subSection: null,
          category: "purchasing",
          label: "Things you buy",
        },
        {
          id: 123,
          amount: 2.4,
          subSection: null,
          category: "transport",
          label: "Transport",
        },
        {
          id: 124,
          amount: 2,
          subSection: null,
          category: "energy",
          label: "Energy",
        },
        {
          id: 125,
          amount: 1.1,
          subSection: null,
          category: "government",
          label: "Schools and hospitals",
        },
        {
          id: 126,
          amount: 1.9,
          subSection: null,
          category: "food",
          label: "Food",
        },
      ],
    })
  );
});
