import {green, red, blue, orange, yellow, grey} from "@mui/material/colors";
const categoryColorMap: any = {
  energy: yellow,
  transport: orange,
  food: blue,
  government: green,
  purchasing: red,
};

export const getCategoryColor = (category: string) => {
  return getCategoryColorArray(category)[500];
};

export const getCategoryColorArray = (category: string) => {
  if (category) {
    const categoryColor = categoryColorMap[category];
    if (categoryColor) return categoryColor;
  }
  return grey;
};
