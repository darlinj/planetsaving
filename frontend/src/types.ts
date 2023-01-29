export interface ClimateData {
  category: "energy" | "food" | "transport" | "government" | "purchasing";
  amount: number;
  label: string;
  color: string;
  colorIntensity: number;
  subCategories?: ClimateData[] | null;
}

export interface CategoryData {
  category: string;
  label: string;
  color: string;
  amount: number;
  colorIntensity: number;
}

export interface ActionData {
  id: number;
  title: string;
  cost: number;
  carbonSaved: number;
  category: ClimateData;
}
