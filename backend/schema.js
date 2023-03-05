const {gql} = require("apollo-server-lambda");
module.exports = gql`
  type Query {
    getClimateData(parentCategory: String): [ClimateData]
    getCategoryData(category: String): Category
    getActionsList(parentCategory: String): [Action]
  }
  type Mutation {
    clearActions: Boolean
    clearEmitions: Boolean
    clearClimateData: Boolean

    addAction(
      title: String
      cost: Float
      carbonSaved: Float
      categoryId: Int
    ): Action

    addClimateChangeData(
      label: String
      category: String
      parentId: Int
      color: String
      colorIntensity: Int
      description: String
      detailed_description: String
    ): ClimateData

    addEmition(
      name: String
      categoryId: Int
      totalCarbonEmited: Float
      calculationType: String
    ): Emition

    addUser(
      name: String
      numberOfPeopleInHome: Float
      unitsOfElectricityUsedPerYear: Int
      unitsOfGasUsedPerYear: Int
      drivingMilesPerYear: Int
      flyingMilesPerYear: Int
      trainMilesPerYear: Int
      carType: String
      greenEnergyTarriff: Boolean
      amountOfLocalFood: String
      amountOfOrganicFood: String
      percentageOfFoodWaste: Int
    ): User
  }

  type Category {
    id: Float
    label: String
    category: String
    parentId: Int
    color: String
    colorIntensity: Int
    description: String
    detailed_description: String
    children: [Category]
  }

  type ClimateData {
    id: Float
    label: String
    category: String
    amount: Float
    parentId: Int
    color: String
    colorIntensity: Int
    description: String
    detailed_description: String
    subCategories: [ClimateData]
  }

  type Emition {
    id: Float
    name: String
    categoryId: Int
    totalCarbonEmited: Float
    calculationType: String
  }

  type User {
    id: Float
    name: String
    numberOfPeopleInHome: Float
    unitsOfElectricityUsedPerYear: Int
    unitsOfGasUsedPerYear: Int
    drivingMilesPerYear: Int
    flyingMilesPerYear: Int
    trainMilesPerYear: Int
    carType: String
    greenEnergyTarriff: Boolean
    amountOfLocalFood: String
    amountOfOrganicFood: String
    percentageOfFoodWaste: Int
  }

  type Action {
    id: Float
    title: String
    cost: Float
    carbonSaved: Float
    category: ClimateData
  }
`;
