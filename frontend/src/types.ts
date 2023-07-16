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
  calculation: string;
  referenceUrls: Reference[];
  colorIntensity: number;
  description: string;
  detailed_description: string;
  children?: CategoryData[];
}

interface Reference {
  url: string;
  label: string;
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
  numberOfPeopleInHome?: number;
  kwhOfElectricityUsedPerYear?: number;
  kwhOfGasUsedPerYear?: number;
  drivingMilesPerYear?: number;
  sizeOfCar?: string;
  flyingHoursPerYear?: number;
  trainMilesPerYear?: number;
  carType?: string;
  greenEnergyTarriff?: Boolean;
  amountOfLocalFood?: string;
  amountOfOrganicFood?: string;
  percentageOfFoodWaste?: number;
}

export interface UserDataInput {
  name?: string;
  numberOfPeopleInHome?: number;
  kwhOfElectricityUsedPerYear?: number;
  kwhOfGasUsedPerYear?: number;
  drivingMilesPerYear?: number;
  sizeOfCar?: string;
  flyingHoursPerYear?: number;
  trainMilesPerYear?: number;
  carType?: string;
  greenEnergyTarriff?: Boolean;
  amountOfLocalFood?: string;
  amountOfOrganicFood?: string;
  percentageOfFoodWaste?: number;
}
