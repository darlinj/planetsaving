require("isomorphic-fetch");

const API_URL = process.env.BACKEND_URL
  ? process.env.BACKEND_URL
  : "http://localhost:4000/";

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
          id: ${data.id},
          label: "${data.label}"
          color: "${data.color}"
          amount: ${data.amount}
          )
        }`
    );
  });
};

export const addActions = async (actionList) => {
  actionList.forEach(async (action) => {
    await sendFetch(
      `mutation {
        addAction(
          id: ${action.id},
          actionTitle: "${action.actionTitle}",
          cost: ${action.cost},
          carbonSaved: ${action.carbonSaved},
          actionType: "${action.actionType}"
          )
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
