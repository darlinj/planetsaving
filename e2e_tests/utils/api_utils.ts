import {request, gql} from "graphql-request";

const API_URL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:4000/";

const sendQuery = async (query) => {
  const result = await request(API_URL, query);
  return result;
};

export const clearActions = async () => {
  await sendQuery(
    gql`
      mutation {
        clearActions
      }
    `
  );
  await new Promise((r) => setTimeout(r, 2000));
};

export const clearClimateData = async () => {
  await sendQuery(
    gql`
      mutation {
        clearClimateData
        clearEmitions
      }
    `
  );
  await new Promise((r) => setTimeout(r, 2000));
};

const addEmitionsRecord = async (emitions, categoryId) => {
  emitions.forEach(async (emition) => {
    const query = await sendQuery(gql`mutation {
        addEmition(
            name: "${emition.name}" 
            categoryId: ${categoryId} 
            totalCarbonEmited: ${emition.totalCarbonEmited}
            ) {
                id
                totalCarbonEmited
            }
        }`);
  });
};

export const addClimateChangeRecord = async (data, parentId = null) => {
  const query = await sendQuery(gql`mutation {
        addClimateChangeData(
          label: "${data.label}"
          category: "${data.category}"
          parentId: ${parentId}
          color: "${data.color}"
          colorIntensity: ${data.colorIntensity}
          ) {
            id
            label
          }
        }`);
  if (data.emitions) {
    await addEmitionsRecord(data.emitions, query.addClimateChangeData.id);
  }
  return query.addClimateChangeData;
};

export const addClimateChangeData = async (
  climateChangeDataList,
  parentId = null
) => {
  climateChangeDataList.forEach(async (data) => {
    const rootRecord = await addClimateChangeRecord(data, parentId);
    if (data.subCategories)
      addClimateChangeData(data.subCategories, rootRecord.id);
  });
};

export const addActions = async (actionList) => {
  actionList.forEach(async (action) => {
    await sendQuery(gql`mutation {
        addAction(
          title: "${action.title}",
          cost: ${action.cost},
          carbonSaved: ${action.carbonSaved},
          categoryId: ${action.categoryId}
          )
          {
            id
            title
          }
        }`);
  });
};
