import {request, gql} from "graphql-request";

const API_URL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:4000/";

const sendQuery = async (query) => {
  const result = await request(API_URL, query);
  return result;
}

export const clearActions = async () => {
  await sendQuery(gql`mutation { clearActions }`);
  await new Promise((r) => setTimeout(r, 2000));
};

export const clearClimateData = async () => {
  await sendQuery(gql`mutation { clearClimateData }`);
  await new Promise((r) => setTimeout(r, 2000));
};

export const addClimateChangeRecord = async (data, parentId = null) => {
  const query = sendQuery(gql`mutation {
        addClimateChangeData(
          label: "${data.label}"
          category: "${data.category}"
          amount: ${data.amount}
          parentId: ${parentId}
          ) {
            id
            label
          }
        }`);
  return query;
};

export const addClimateChangeData = async (
  climateChangeDataList,
  parentId = null
) => {
  climateChangeDataList.forEach(async (data) => {
    const rootRecord = await addClimateChangeRecord(data, parentId);
    if (data.subCategories)
      addClimateChangeData(
        data.subCategories,
        rootRecord.addClimateChangeData.id
      );
  });
};

export const addActions = async (actionList) => {
  actionList.forEach(async (action) => {
    await sendQuery(gql
      `mutation {
        addAction(
          title: "${action.title}",
          cost: ${action.cost},
          carbonSaved: ${action.carbonSaved},
          category: "${action.category}"
          )
          {
            id
            title
          }
        }`
    );
  });
};
