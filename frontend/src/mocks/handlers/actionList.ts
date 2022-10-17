import {graphql} from "msw";

export default graphql.query("GetActionsList", (req, res, ctx) => {
  return res(
    ctx.data({
      getActionsList: [
        {
          id: 123,
          actionTitle: "Reduce your thermostat by one degree",
          cost: 0,
          carbonSaved: 0.3,
          actionType: "energy",
        },
        {
          id: 124,
          actionTitle: "Buy an electric car",
          cost: 30000,
          carbonSaved: 1.0,
          actionType: "transport",
        },
        {
          id: 125,
          actionTitle: "Stop buying air freighted food",
          cost: 0,
          carbonSaved: 0.3,
          actionType: "food",
        },
        {
          id: 126,
          actionTitle: "Buy more second hand things",
          cost: 0,
          carbonSaved: 0.4,
          actionType: "purchasing",
        },
      ],
    })
  );
});
