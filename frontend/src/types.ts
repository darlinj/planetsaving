export interface ClimateData {
  category: "energy" | "food" | "transport" | "government" | "purchasing";
  amount: number;
  label: string;
  color: string;
  colorIntensity: number;
  subSection: ClimateData[] | null;
}

export interface ActionData {
  id: number;
  title: string;
  cost: number;
  carbonSaved: number;
  category: "energy" | "food" | "transport" | "government" | "purchasing";
}
