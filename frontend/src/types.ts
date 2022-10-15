export interface ClimateData {
  amount: number;
  label: string;
  color: string;
  subSection: ClimateData[] | null;
}

export interface ActionData {
  id: number;
  actionTitle: string;
  cost: number;
  carbonSaved: number;
  actionType: "energy" | "food" | "transport" | "government" | "purchasing";
}
