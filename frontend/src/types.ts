export interface ClimateData {
  category: string;
  amount: number;
  label: string;
  color: string;
  colorIntensity: number;
  description: string;
  detailed_description: string;
  subCategories?: ClimateData[] | null;
}

export interface CategoryData {
  category: string;
  label: string;
  color: string;
  amount: number;
  colorIntensity: number;
  description: string;
  detailed_description: string;
  children?: CategoryData[];
}

export interface ActionData {
  id: number;
  title: string;
  cost: number;
  carbonSaved: number;
  category: ClimateData;
}

export interface UserData {
  id: number;
  name: string;
  numberOfPeopleInHome: number;
  kwhOfElectricityUsedPerYear: number;
  kwhOfGasUsedPerYear: number;
  drivingMilesPerYear: number;
  sizeOfCar: string;
  flyingMilesPerYear: number;
  trainMilesPerYear: number;
  carType: string;
  greenEnergyTarriff: Boolean;
  amountOfLocalFood: string;
  amountOfOrganicFood: string;
  percentageOfFoodWaste: number;
}
