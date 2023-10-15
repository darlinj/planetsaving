const tailPipeEmissionsEmissions = require("./tailPipeEmissions");
const simpleMultiplierBy2 = require("./simpleMultiplierBy2");
const flyingEmissions = require("./flyingEmissions");
const gasEmissions = require("./gasEmissions");
const meatEmissions = require("./meatEmissions");
const fertilizerEmissions = require("./fertilizerEmissions");
const electricityEmissions = require("./electricityEmissions");
const foodTransportEmissions = require("./foodTransportEmissions");
const nhsEmissions = require("./nhsEmissions");
const educationEmissions = require("./educationEmissions");
const policeEmissions = require("./policeEmissions");
const roadEmissions = require("./roadEmissions");
const cateringEmissions = require("./cateringEmissions");
const miscEmissions = require("./miscEmissions");
const homeEmissions = require("./homeEmissions");
const recreationalEmissions = require("./recreationalEmissions");
const militaryEmissions = require("./militaryEmissions");

const calculateEmission = (calculationIdentifier, operands) => {
  switch (calculationIdentifier) {
    case "simple_multiplier_by_2":
      return simpleMultiplierBy2(operands);
    case "driving_tail_pipe":
      return tailPipeEmissionsEmissions(operands);
    case "flying":
      return flyingEmissions(operands);
    case "gas":
      return gasEmissions(operands);
    case "electricity":
      return electricityEmissions(operands);
    case "meat":
      return meatEmissions(operands);
    case "fertilizer":
      return fertilizerEmissions(operands);
    case "food_transport":
      return foodTransportEmissions(operands);
    case "nhs":
      return nhsEmissions(operands);
    case "education":
      return educationEmissions(operands);
    case "police":
      return policeEmissions(operands);
    case "roads":
      return roadEmissions(operands);
    case "catering":
      return cateringEmissions(operands);
    case "misc":
      return miscEmissions(operands);
    case "home":
      return homeEmissions(operands);
    case "recreational":
      return recreationalEmissions(operands);
    case "military":
      return militaryEmissions(operands);
    default:
      return {
        calculation: operands.totalCarbonEmited * 1.0,
        description: `${operands.totalCarbonEmited} Tons emitted by ${operands.label}`,
        referenceUrls: [
          {
            label: "Carbon Independent",
            url: "https://www.carbonindependent.org/",
          },
        ],
      };
  }
};

module.exports = calculateEmission;
