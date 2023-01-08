import {Selector, ClientFunction, test} from "testcafe";
import {clearClimateData, addClimateChangeData} from "./utils/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

fixture`Footprint tests`.page(URL).before(async (t) => {
  await clearClimateData();
  const climateCategory = [
    {
      label: "Things you buy",
      category: "purchasing",
      color: "orange",
      colorIntensity: 500,
      subCategories: [
        {
          label: "Imported good",
          category: "import",
          color: "orange",
          colorIntensity: 300,
          emitions: [
            {
              totalCarbonEmited: 3.2,
              name: "All imported goods average",
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
              totalCarbonEmited: 0.5,
              name: "Manufacturing the car",
            },
            {
              totalCarbonEmited: 1,
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
              totalCarbonEmited: 1,
              name: "Aviation fuel",
            },
            {
              totalCarbonEmited: 1,
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
              totalCarbonEmited: 0.3,
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
              totalCarbonEmited: 3.2,
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
          label: "Government",
          category: "all_gov",
          color: "green",
          colorIntensity: 300,
          emitions: [
            {
              totalCarbonEmited: 3.2,
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
          label: "All food",
          category: "all_food",
          color: "blue",
          colorIntensity: 300,
          emitions: [
            {
              totalCarbonEmited: 3.2,
              name: "all food",
            },
          ],
        },
      ],
    },
  ];
  await addClimateChangeData(climateCategory);
  await new Promise((r) => setTimeout(r, 2000));
});

test("Check default footprint", async (t) => {
  const footprint = Selector("#footprint");
  await t.expect(footprint.textContent).contains("Things you buy(3.2 Tons)");
  await t.expect(footprint.textContent).contains("Transport(3.8 Tons)");
  await t.expect(footprint.textContent).contains("Energy(3.2 Tons)");
  await t
    .expect(footprint.textContent)
    .contains("Schools and hospitals(3.2 Tons)");
  await t.expect(footprint.textContent).contains("Food(3.2 Tons)");
});

test("Clicking on a category opens up the sub category footprint", async (t) => {
  const transportLink = Selector("#transport");
  await t.click(transportLink);
  const footprint = Selector("#footprint");
  await t.expect(footprint.textContent).contains("Driving");
  await t.expect(footprint.textContent).contains("Flying");
  await t.expect(footprint.textContent).contains("Train");
});

test("The amount of C02 equiv under the footprint is correct", async (t) => {
  const footprint = Selector("#footprint-footer");
  await t
    .expect(footprint.textContent)
    .contains("Total 16.6 Tons of CO2 equivalent");
});
