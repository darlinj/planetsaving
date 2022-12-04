import {graphql} from "msw";

export default graphql.query("GetActionsList", (req, res, ctx) => {
  return res(
    ctx.data({
      getActionsList: [
        {
          id: 123,
          title: "Reduce your thermostat by one degree",
          cost: 0,
          carbonSaved: 0.3,
          category: "energy",
        },
        {
          id: 124,
          title: "Buy an electric car",
          cost: 30000,
          carbonSaved: 1.0,
          category: "transport",
        },
        {
          id: 125,
          title: "Stop buying air freighted food",
          cost: 0,
          carbonSaved: 0.3,
          category: "food",
        },
        {
          id: 126,
          title: "Buy more second hand things",
          cost: 0,
          carbonSaved: 0.4,
          category: "purchasing",
        },
      ],
    })
  );
});
