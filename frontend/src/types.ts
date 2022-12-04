export interface ClimateData {
  category: "energy" | "food" | "transport" | "government" | "purchasing";
  amount: number;
  label: string;
  subSection: ClimateData[] | null;
}

export interface ActionData {
  id: number;
  title: string;
  cost: number;
  carbonSaved: number;
  type: "energy" | "food" | "transport" | "government" | "purchasing";
}
