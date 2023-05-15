const {gql} = require("apollo-server-lambda");
module.exports = gql`
  type Query {
    getClimateData(parentCategory: String, userId: Int): [ClimateData]
    getCategoryData(category: String): Category
    getActionsList(parentCategory: String): [Action]
    getUser(id: Int): User
  }
  type Mutation {
    clearActions: Boolean
    clearEmissions: Boolean
    clearClimateData: Boolean
    clearAverageJoeUser: Boolean

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

    addEmission(
      name: String
      categoryId: Int
      totalCarbonEmited: Float
      calculationType: String
      calculationIdentifier: String
    ): Emission

    addUser(
      name: String
      numberOfPeopleInHome: Float
      kwhOfElectricityUsedPerYear: Int
      kwhOfGasUsedPerYear: Int
      drivingMilesPerYear: Int
      sizeOfCar: String
      flyingMilesPerYear: Int
      trainMilesPerYear: Int
      carType: String
      greenEnergyTarriff: Boolean
      amountOfLocalFood: String
      amountOfOrganicFood: String
      percentageOfFoodWaste: Int
    ): User

    addOrUpdateUser(id: Int, user: UserInput): User
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
    amount(userId: Int): Float
    parentId: Int
    color: String
    colorIntensity: Int
    description: String
    detailed_description: String
    subCategories: [ClimateData]
  }

  type Emission {
    id: Float
    name: String
    categoryId: Int
    totalCarbonEmited: Float
    calculationType: String
    calculationIdentifier: String
  }

  input UserInput {
    name: String
    numberOfPeopleInHome: Float
    kwhOfElectricityUsedPerYear: Int
    kwhOfGasUsedPerYear: Int
    drivingMilesPerYear: Int
    sizeOfCar: String
    flyingMilesPerYear: Int
    trainMilesPerYear: Int
    carType: String
    greenEnergyTarriff: Boolean
    amountOfLocalFood: String
    amountOfOrganicFood: String
    percentageOfFoodWaste: Int
  }

  type User {
    id: Int
    name: String
    numberOfPeopleInHome: Float
    kwhOfElectricityUsedPerYear: Int
    kwhOfGasUsedPerYear: Int
    drivingMilesPerYear: Int
    sizeOfCar: String
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
