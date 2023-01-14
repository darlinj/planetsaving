const climateData = [
  {
    label: "Miscellaneous",
    category: "misc",
    color: "orange",
    colorIntensity: 500,
    subCategories: [
      {
        label: "All Miscellaneous",
        category: "all_misc",
        color: "orange",
        colorIntensity: 300,
        emitions: [
          {
            totalCarbonEmited: 3.19,
            name: "All Miscellaneous emitions",
          },
        ],
      },
    ],
  },
  {
    label: "Transport",
    category: "transport",
    color: "red",
    colorIntensity: 500,
    subCategories: [
      {
        label: "Driving",
        category: "driving",
        color: "red",
        colorIntensity: 300,
        emitions: [
          {
            totalCarbonEmited: 1.17,
            name: "Tail pipe emitions",
          },
        ],
      },
      {
        label: "Flying",
        category: "flying",
        color: "red",
        colorIntensity: 500,
        emitions: [
          {
            totalCarbonEmited: 1.25,
            name: "Running the airport",
          },
        ],
      },
      {
        label: "Train",
        category: "train",
        color: "red",
        colorIntensity: 700,
        emitions: [
          {
            totalCarbonEmited: 0.12,
            name: "Average Train useage",
          },
        ],
      },
      {
        label: "Other",
        category: "other_transport",
        color: "red",
        colorIntensity: 900,
        emitions: [
          {
            totalCarbonEmited: 0.01,
            name: "Average Train useage",
          },
        ],
      },
    ],
  },
  {
    label: "Energy",
    category: "energy",
    color: "yellow",
    colorIntensity: 500,
    subCategories: [
      {
        label: "Gas",
        category: "gas",
        color: "yellow",
        colorIntensity: 300,
        emitions: [
          {
            totalCarbonEmited: 1.52,
            name: "All gas",
          },
        ],
      },
      {
        label: "Electricity",
        category: "electricity",
        color: "yellow",
        colorIntensity: 500,
        emitions: [
          {
            totalCarbonEmited: 0.62,
            name: "All gas",
          },
        ],
      },
    ],
  },
  {
    label: "Schools and hospitals",
    category: "government",
    color: "green",
    colorIntensity: 500,
    subCategories: [
      {
        label: "All government activity",
        category: "all_gov",
        color: "green",
        colorIntensity: 300,
        emitions: [
          {
            totalCarbonEmited: 1.1,
            name: "All government",
          },
        ],
      },
    ],
  },
  {
    label: "Food",
    category: "food",
    color: "blue",
    colorIntensity: 500,
    subCategories: [
      {
        label: "Fertilizer use",
        category: "fertilizer",
        color: "blue",
        colorIntensity: 100,
        emitions: [
          {
            totalCarbonEmited: 0.7,
            name: "Fertilizer",
          },
        ],
      },
      {
        label: "Meat and dairy",
        category: "meat_and_dairy",
        color: "blue",
        colorIntensity: 200,
        emitions: [
          {
            totalCarbonEmited: 0.4,
            name: "Meat and Dairy",
          },
        ],
      },
      {
        label: "Food transportation",
        category: "food_transport",
        color: "blue",
        colorIntensity: 300,
        emitions: [
          {
            totalCarbonEmited: 0.3,
            name: "Food Transportation",
          },
        ],
      },
      {
        label: "Packaging",
        category: "packaging",
        color: "blue",
        colorIntensity: 400,
        emitions: [
          {
            totalCarbonEmited: 0.23,
            name: "Fertilizer",
          },
        ],
      },
      {
        label: "Processing",
        category: "processing",
        color: "blue",
        colorIntensity: 500,
        emitions: [
          {
            totalCarbonEmited: 0.18,
            name: "Processing of food",
          },
        ],
      },
      {
        label: "Food waste",
        category: "food_waste",
        color: "blue",
        colorIntensity: 600,
        emitions: [
          {
            totalCarbonEmited: 0.22,
            name: "food_waste",
          },
        ],
      },
      {
        label: "Other",
        category: "food_other",
        color: "blue",
        colorIntensity: 700,
        emitions: [
          {
            totalCarbonEmited: 0.18,
            name: "Other food emitions",
          },
        ],
      },
    ],
  },
];

export default climateData;
