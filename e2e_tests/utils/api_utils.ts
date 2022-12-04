require("isomorphic-fetch");

const API_URL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:4000/";

console.log("API_URL:", API_URL);

export const clearActions = async () => {
  await sendFetch(`mutation { clearActions }`);
  await new Promise((r) => setTimeout(r, 2000));
};

export const clearClimateData = async () => {
  await sendFetch(`mutation { clearClimateData }`);
  await new Promise((r) => setTimeout(r, 2000));
};

export const addClimateChangeData = async (climateChangeDataList) => {
  climateChangeDataList.forEach(async (data) => {
    await sendFetch(
      `mutation {
        addClimateChangeData(
          label: "${data.label}"
          category: "${data.category}"
          amount: ${data.amount}
          ) {
            id
            label
          }
        }`
    );
  });
};

export const addActions = async (actionList) => {
  actionList.forEach(async (action) => {
    await sendFetch(
      `mutation {
        addAction(
          title: "${action.title}",
          cost: ${action.cost},
          carbonSaved: ${action.carbonSaved},
          type: "${action.type}"
          )
          {
            id
            title
          }
        }`
    );
  });
};

const sendFetch = async (graphqlRequest) => {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: graphqlRequest,
    }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
};
