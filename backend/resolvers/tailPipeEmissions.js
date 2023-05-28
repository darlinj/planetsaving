const carbonEmittedPerMileDieselKg = 0.253;
const carbonEmittedPerMileElectricKg = 0.053;
const largeCarFactor = 1.3;
const smallCarFactor = 0.7;

module.exports = (operands) => {
  if (operands["drivingMilesPerYear"]) {
    if (operands["carType"] === "electric") {
      return (
        operands["drivingMilesPerYear"] *
        (carbonEmittedPerMileElectricKg / 1000)
      );
    }
    switch (operands.sizeOfCar) {
      case "small":
        return (
          (operands["drivingMilesPerYear"] *
            (carbonEmittedPerMileDieselKg * smallCarFactor)) /
          1000
        );
      case "large":
        return (
          (operands["drivingMilesPerYear"] *
            (carbonEmittedPerMileDieselKg * largeCarFactor)) /
          1000
        );
      default:
        return (
          operands["drivingMilesPerYear"] *
          (carbonEmittedPerMileDieselKg / 1000)
        );
    }
  }
  return 0;
};
