const climateData = [
  {
    label: "Miscellaneous",
    category: "misc",
    color: "orange",
    colorIntensity: 500,
    description: "Everything else. From things you buy to leisure activities",
    detailed_description: "Todo: fill this in",
    subCategories: [
      {
        label: "Hotels, pubs and catering",
        category: "catering",
        color: "orange",
        colorIntensity: 300,
        description:
          "The carbon emissions from staying and eating away from home.",
        detailed_description:
          "Eating out and staying away from home causes carbon emissions from heating the rooms to the food that is wasted in most commercial kitchens it all adds up to about 42 millions tons of CO2e per year.  You can reduce your impact by choosing establishments that have an carbon aware attitude",
        emissions: [
          {
            totalCarbonEmited: 0.63,
            name: "Hotels, pubs and catering",
            category: "catering",
          },
        ],
      },
      {
        label: "All Miscellaneous",
        category: "all_misc",
        color: "orange",
        colorIntensity: 500,
        description:
          "Everything else that causes carbon to be emited.  This includes everything from the things you buy to your leisure activities",
        detailed_description: "Todo: fill this in",
        emissions: [
          {
            totalCarbonEmited: 2.56,
            name: "All Miscellaneous emissions",
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
          "Driving a car is one of the most polluting things we do.  Obviously there are carbon emissions from burning fossil fuels but also from the car manufacturing process.  The most planet friendly thing you can do here is to go electric, drive less and keep your car for longer",
        detailed_description:
          "Driving a car is one of the most polluting things we do.  Obviously there are carbon emissions from burning fossil fuels but also from the car manufacturing process.  The most planet friendly thing you can do here is to go electric, drive less and keep your car for longer",
        emissions: [
          {
            totalCarbonEmited: 1.17,
            name: "Tail pipe emissions",
            calculationIdentifier: "driving_tail_pipe",
          },
        ],
      },
      {
        label: "Flying",
        category: "flying",
        color: "red",
        colorIntensity: 500,
        description:
          "Flying is a big cause of carbon emissions because it takes a lot of fuel to keep a plane in the air and the C02 is emitied at a higher altitude which means it is even worse for the planet.  The main way to flying better is to do less of it.  Do you really need to take that business trip?  Could you do with one foriegn holiday this year?  Could you go by train?",
        detailed_description:
          "Flying is a big cause of carbon emissions because it takes a lot of fuel to keep a plane in the air and the C02 is emitied at a higher altitude which means it is even worse for the planet.  The main way to flying better is to do less of it.  Do you really need to take that business trip?  Could you do with one foriegn holiday this year?  Could you go by train?",
        emissions: [
          {
            totalCarbonEmited: 1.25,
            name: "Running the airport",
            calculationIdentifier: "flying",
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
        emissions: [
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
        emissions: [
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
        emissions: [
          {
            totalCarbonEmited: 1.52,
            name: "All gas",
            calculationIdentifier: "gas",
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
        emissions: [
          {
            totalCarbonEmited: 0.62,
            name: "All electricity",
            calculationIdentifier: "electricity",
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
        label: "The Military",
        category: "military",
        color: "green",
        colorIntensity: 500,
        description:
          "The GHG emissions of UK military spending in 2018 – using the consumption-based approach – was approximately 11 million tonnes of CO2 equivalent.",
        detailed_description:
          "The green house gas emissions of UK military spending in 2018 was approximately 11 million tonnes of CO2 equivalent. This includes all lifecycle emissions, such as those arising abroad from raw material extraction. This is more than 3.5 times larger than the total direct GHG emissions of the MOD, and more than 11 times larger than the GHG figures quoted in the main text of MOD annual reports. It is also equivalent to the total CO2 emitted by the annual average mileage driven by over six million UK cars.  These figures do not include the GHG emissions related to impacts of weapons use on the battlefield. Such emissions could potentially be large, but are highly uncertain. Source: https://www.sgr.org.uk/sites/default/files/2020-05/SGR-DUK_UK_Military_Env_Impacts.pdf",
        emissions: [
          {
            totalCarbonEmited: 0.175,
            name: "All Military",
          },
        ],
      },
      {
        label: "All government activity",
        category: "all_gov",
        color: "green",
        colorIntensity: 300,
        description:
          "This category will be broken down soon. This category represents the emissions from everything else that your government does on your behalf from running schools and hospitals to the army and building roads.  It is easy to think there is nothing you can do about this but your vote is the most powerful weapon you have to effect change.  Do you know what your MP is doing to help the climate?",
        detailed_description:
          "This category will be broken down soon. This category represents the emissions from everything that your government does on your behalf from running schools and hospitals to the army and building roads.  It is easy to think there is nothing you can do about this but your vote is the most powerful weapon you have to effect change.  Do you know what your MP is doing to help the climate?",
        emissions: [
          {
            totalCarbonEmited: 1.0,
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
        emissions: [
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
        emissions: [
          {
            totalCarbonEmited: 0.4,
            name: "Meat and Dairy",
            calculationIdentifier: "meat",
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
        emissions: [
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
        emissions: [
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
        emissions: [
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
        emissions: [
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
        emissions: [
          {
            totalCarbonEmited: 0.18,
            name: "Other food emissions",
          },
        ],
      },
    ],
  },
];

export default climateData;
