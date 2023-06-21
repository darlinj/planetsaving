module.exports = (operands) => {
  return {calculation: calc(operands), description: desc(operands)};
};

const desc = (operands) => {
  return "It multiplies by 2 Obvs!";
};

const calc = (operands) => {
  return operands["userValueToMultiply"] * 2;
};
