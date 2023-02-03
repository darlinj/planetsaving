export interface ClimateData {
  category: string;
  amount: number;
  label: string;
  color: string;
  colorIntensity: number;
  description: string;
  subCategories?: ClimateData[] | null;
}

export interface CategoryData {
  category: string;
  label: string;
  color: string;
  amount: number;
  colorIntensity: number;
  description: string;
  children?: CategoryData[];
}

export interface ActionData {
  id: number;
  title: string;
  cost: number;
  carbonSaved: number;
  category: ClimateData;
}
