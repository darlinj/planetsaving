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
          type: "energy",
        },
        {
          id: 124,
          title: "Buy an electric car",
          cost: 30000,
          carbonSaved: 1.0,
          type: "transport",
        },
        {
          id: 125,
          title: "Stop buying air freighted food",
          cost: 0,
          carbonSaved: 0.3,
          type: "food",
        },
        {
          id: 126,
          title: "Buy more second hand things",
          cost: 0,
          carbonSaved: 0.4,
          type: "purchasing",
        },
      ],
    })
  );
});
