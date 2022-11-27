export interface ClimateData {
  amount: number;
  label: string;
  color: string;
  subSection: ClimateData[] | null;
}

export interface ActionData {
  id: number;
  title: string;
  cost: number;
  carbonSaved: number;
  type: "energy" | "food" | "transport" | "government" | "purchasing";
}
