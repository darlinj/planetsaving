const {gql} = require("apollo-server-lambda");
module.exports = gql`
  type Query {
    getClimateData(parentCategory: String, userId: Int): [ClimateData]
    getCategoryData(category: String, userId: Int): Category
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

    addUser(user: UserInput): User

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
    amount(userId: Int): Float
    calculation(userId: Int): String
    referenceUrls: [Reference]
    children: [Category]
  }

  type Reference {
    label: String
    url: String
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
    m3OfGasUsedPerYear: Int
    drivingMilesPerYear: Int
    sizeOfCar: String
    flyingHoursPerYear: Float
    trainMilesPerYear: Float
    carType: String
    greenEnergyTarriff: Boolean
    amountOfLocalFood: String
    amountOfOrganicFood: String
    percentageOfFoodWaste: Int
    userValueToMultiply: Int
    gasEstimationType: String
    electricityEstimationType: String
    houseSize: String
  }

  type User {
    id: Int
    name: String
    numberOfPeopleInHome: Float
    kwhOfElectricityUsedPerYear: Int
    kwhOfGasUsedPerYear: Int
    m3OfGasUsedPerYear: Int
    drivingMilesPerYear: Int
    sizeOfCar: String
    flyingHoursPerYear: Float
    trainMilesPerYear: Int
    carType: String
    greenEnergyTarriff: Boolean
    amountOfLocalFood: String
    amountOfOrganicFood: String
    percentageOfFoodWaste: Int
    userValueToMultiply: Int
    gasEstimationType: String
    electricityEstimationType: String
    houseSize: String
  }

  type Action {
    id: Float
    title: String
    cost: Float
    carbonSaved: Float
    category: ClimateData
  }
`;
