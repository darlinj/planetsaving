const climateData = [
  {
    label: "Miscellaneous",
    category: "misc",
    color: "orange",
    colorIntensity: 500,
    description: "Everything else. From things you buy to leisure activities",
    detailed_description:
      "Everything else. From things you buy to leisure activities",
    subCategories: [
      {
        label: "All Miscellaneous",
        category: "all_misc",
        color: "orange",
        colorIntensity: 300,
        description:
          "Everything else that causes carbon to be emited.  This includes everything from the things you buy to your leisure activities",
        detailed_description:
          "Everything else that causes carbon to be emited.  This includes everything from the things you buy to your leisure activities",
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
    description: "Planes, trains and automobiles etc.",
    detailed_description: "Planes, trains and automobiles etc.",
    subCategories: [
      {
        label: "Driving",
        category: "driving",
        color: "red",
        colorIntensity: 300,
        description:
          "Driving a car is one of the most polluting things we do.  Obviously there are carbon emitions from burning fossil fuels but also from the car manufacturing process.  The most planet friendly thing you can do here is to go electric, drive less and keep your car for longer",
        detailed_description:
          "Driving a car is one of the most polluting things we do.  Obviously there are carbon emitions from burning fossil fuels but also from the car manufacturing process.  The most planet friendly thing you can do here is to go electric, drive less and keep your car for longer",
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
        description:
          "Flying is a big cause of carbon emitions because it takes a lot of fuel to keep a plane in the air and the C02 is emitied at a higher altitude which means it is even worse for the planet.  The main way to flying better is to do less of it.  Do you really need to take that business trip?  Could you do with one foriegn holiday this year?  Could you go by train?",
        detailed_description:
          "Flying is a big cause of carbon emitions because it takes a lot of fuel to keep a plane in the air and the C02 is emitied at a higher altitude which means it is even worse for the planet.  The main way to flying better is to do less of it.  Do you really need to take that business trip?  Could you do with one foriegn holiday this year?  Could you go by train?",
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
        description:
          "Traveling by train is much less damaging than flying, especially if it is an electric powered train.  The more people on a train the more carbon efficient it is",
        detailed_description:
          "Traveling by train is much less damaging than flying, especially if it is an electric powered train.  The more people on a train the more carbon efficient it is",
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
        description:
          "This includes buses, underground, cycling and walking which all have a carbon impact but are much lower than the other transport options",
        detailed_description:
          "This includes buses, underground, cycling and walking which all have a carbon impact but are much lower than the other transport options",
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
    description: "The carbon released by heating, cooking, lighting your home.",
    detailed_description:
      "The carbon released by heating, cooking, lighting your home.",
    subCategories: [
      {
        label: "Gas",
        category: "gas",
        color: "yellow",
        colorIntensity: 300,
        description:
          "Gas is a fossil fuel which burns and releases C02 directly out of your boiler flue. The more gas you use, the more C02e is released.  Think about insulating your house better or buying a groundsource or airsource heatpump to reduce your use of gas",
        detailed_description:
          "Gas is a fossil fuel which burns and releases C02 directly out of your boiler flue. The more gas you use, the more C02e is released.  Think about insulating your house better or buying a groundsource or airsource heatpump to reduce your use of gas",
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
        description:
          "Electricity doesn't release C02 directly but often it is generated by burning gas which does cause C02 to be released.  There are lots of things you can do to reduce your carbon impact from electricity from choosing a green tarrif to putting solar panels on your roof",
        detailed_description:
          "Electricity doesn't release C02 directly but often it is generated by burning gas which does cause C02 to be released.  There are lots of things you can do to reduce your carbon impact from electricity from choosing a green tarrif to putting solar panels on your roof",
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
    description:
      "All government activities including schools, hospitals, the army etc",
    detailed_description:
      "All government activities including schools, hospitals, the army etc",
    subCategories: [
      {
        label: "All government activity",
        category: "all_gov",
        color: "green",
        colorIntensity: 300,
        description:
          "This category will be broken down soon. This category represents the emitions from everything that your government does on your behalf from running schools and hospitals to the army and building roads.  It is easy to think there is nothing you can do about this but your vote is the most powerful weapon you have to effect change.  Do you know what your MP is doing to help the climate?",
        detailed_description:
          "This category will be broken down soon. This category represents the emitions from everything that your government does on your behalf from running schools and hospitals to the army and building roads.  It is easy to think there is nothing you can do about this but your vote is the most powerful weapon you have to effect change.  Do you know what your MP is doing to help the climate?",
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
    description:
      "All the C02e emited from the growing, processing and transportation of your food",
    detailed_description:
      "All the C02e emited from the growing, processing and transportation of your food",
    subCategories: [
      {
        label: "Fertilizer use",
        category: "fertilizer",
        color: "blue",
        colorIntensity: 100,
        description:
          "Fertilizer is one of the worst food based problems.  It releases a lot of C02 and requires methane.  Buying organic produce reduces the damage",
        detailed_description:
          "Fertilizer is one of the worst food based problems.  It releases a lot of C02 and requires methane.  Buying organic produce reduces the damage",
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
        description:
          "Cows and sheep are the most damaging animals to rear.  Maybe consider reducing the amount of red meat that you eat or even go veggie",
        detailed_description:
          "Cows and sheep are the most damaging animals to rear.  Maybe consider reducing the amount of red meat that you eat or even go veggie",
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
        description:
          "Generally the further your food is transported the worse it is for the climate.  Air freighted delicate foods like soft fruit from South America are the worst offenders",
        detailed_description:
          "Generally the further your food is transported the worse it is for the climate.  Air freighted delicate foods like soft fruit from South America are the worst offenders",
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
        description: "This is simple, the less packaging the better.",
        detailed_description: "This is simple, the less packaging the better.",
        emitions: [
          {
            totalCarbonEmited: 0.23,
            name: "Packaging",
          },
        ],
      },
      {
        label: "Processing",
        category: "processing",
        color: "blue",
        colorIntensity: 500,
        description:
          "Making food from raw ingredients is better for the environment and better for you",
        detailed_description:
          "Making food from raw ingredients is better for the environment and better for you",
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
        description: "Throwing food away means that it rots and releases C02.",
        detailed_description:
          "Throwing food away means that it rots and releases C02.",
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
        description: "Some C02 from food is unavoidable",
        detailed_description: "Some C02 from food is unavoidable",
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
