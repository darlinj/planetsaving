import {request, gql} from "graphql-request";
import climateData from "./climate_change_data";
import actions from "./actions";
import users from "./users";

const API_URL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:4000/";

class ClimateData {
  createdRecords: any;
  constructor() {
    this.createdRecords = [];
  }

  sendQuery(query: string) {
    return request(API_URL, query).then((response) => {
      return response;
    });
  }

  async clearClimateData() {
    await this.sendQuery(
      gql`
        mutation {
          clearActions
          clearClimateData
          clearEmissions
          clearAverageJoeUser
        }
      `
    );
    await new Promise((r) => setTimeout(r, 2000));
  }

  addEmissionsRecord(emissions: any, categoryId: any) {
    emissions.forEach((emission: any) => {
      const query = this.sendQuery(gql`mutation {
          addEmission(
              name: "${emission.name}"
              categoryId: ${categoryId}
              totalCarbonEmited: ${emission.totalCarbonEmited}
              calculationTemplate: ${emission.calculationTemplate || null}
              ) {
                  id
                  totalCarbonEmited
              }
          }`);
    });
  }

  async addUsers(userList: any) {
    return await Promise.all(
      userList.map((user: any) => {
        this.sendQuery(gql`mutation {
          addUser(
            ${Object.keys(user).map(
              (key) =>
                `${key}: ${
                  typeof user[key] == "string" ? `"${user[key]}"` : user[key]
                }`
            )})
            {
              id
              name
            }
          }`);
      })
    );
  }

  async addActions(actionList: any) {
    return await Promise.all(
      actionList.map((action: any) => {
        const category = this.createdRecords.filter(
          (cat: any) => cat.category == action.category
        )[0];
        this.sendQuery(gql`mutation {
          addAction(
            title: "${action.title}",
            cost: ${action.cost},
            carbonSaved: ${action.carbonSaved},
            categoryId: ${category.id}
            )
            {
              id
              title
            }
          }`);
      })
    );
  }

  addCategory(category: any, parentId: string | null) {
    return this.sendQuery(
      gql`mutation {
          addClimateChangeData(
            label: "${category.label}"
            category: "${category.category}"
            parentId: ${parentId}
            color: "${category.color}"
            description: "${category.description}"
            detailed_description: "${category.detailed_description}"
            colorIntensity: ${category.colorIntensity}
            ) {
              id
              category
            }
          }`
    ).then(async (result) => {
      this.createdRecords.push(result.addClimateChangeData);
      if (category.subCategories) {
        return await Promise.all(
          category.subCategories.map((category: any) => {
            return this.addCategory(category, result.addClimateChangeData.id);
          })
        );
      }
      if (category.emissions) {
        this.addEmissionsRecord(
          category.emissions,
          result.addClimateChangeData.id
        );
      }
      return result;
    });
  }

  async addClimateChangeData(categories: any[], parentId = null) {
    return await Promise.all(
      categories.map((category: any) => {
        return this.addCategory(category, parentId).then(async (result) => {});
      })
    );
  }

  async setup() {
    await this.clearClimateData();
    await this.addClimateChangeData(climateData);
    await this.addActions(actions);
    await this.addUsers(users);
  }
}

export default ClimateData;
