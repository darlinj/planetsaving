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
      amount: 3.2,
    },
    {
      label: "Transport",
      category: "transport",
      amount: 2.4,
      subCategories: [
        {
          label: "Driving",
          category: "driving",
          amount: 1,
        },
        {
          label: "Flying",
          category: "flying",
          amount: 1,
        },
        {
          label: "Train",
          category: "train",
          amount: 0.4,
        },
      ],
    },
    {
      label: "Energy",
      category: "energy",
      amount: 2,
    },
    {
      label: "Schools and hospitals",
      category: "government",
      amount: 1.1,
    },
    {
      label: "Food",
      category: "food",
      amount: 1.9,
    },
  ];
  await addClimateChangeData(climateCategory);
  await new Promise((r) => setTimeout(r, 2000));
});

test("Check default footprint", async (t) => {
  const footprint = Selector("#footprint");
  await t.expect(footprint.textContent).contains("Things you buy(3.2 Tons)");
  await t.expect(footprint.textContent).contains("Transport(2.4 Tons)");
  await t.expect(footprint.textContent).contains("Energy(2 Tons)");
  await t
    .expect(footprint.textContent)
    .contains("Schools and hospitals(1.1 Tons)");
  await t.expect(footprint.textContent).contains("Food(1.9 Tons)");
});

test("Clicking on a category opens up the sub category footprint", async (t) => {
  const transportLink = Selector("#transport");
  await t.click(transportLink);
  const footprint = Selector("#footprint");
  await t.expect(footprint.textContent).contains("Driving");
  await t.expect(footprint.textContent).contains("Flying");
  await t.expect(footprint.textContent).contains("Train");
});
