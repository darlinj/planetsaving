import {graphql} from "msw";

export default graphql.query("GetCategoryData", (req, res, ctx) => {
  return res(
    ctx.data({
      getCategoryData: {
        amount: 10,
        category: "some_category",
        label: "Some Category",
        color: "green",
        colorIntensity: 500,
      },
    })
  );
});
