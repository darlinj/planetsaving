import {green, red, blue, orange, yellow, grey} from "@mui/material/colors";
const categoryColorMap: any = {
  yellow: yellow,
  orange: orange,
  blue: blue,
  green: green,
  red: red,
};

export const getCategoryColorArray = (color: string) => {
  if (color) {
    const categoryColor = categoryColorMap[color];
    if (categoryColor) return categoryColor;
  }
  return grey;
};
