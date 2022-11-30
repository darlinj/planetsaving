import {Selector, ClientFunction} from "testcafe";
import {clearClimateData, addClimateChangeData} from "./utils/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

fixture`Footprint tests`.page(URL).before(async (t) => {
  await clearClimateData();
  const climateCategory = [
    {
      label: "Things you buy",
      color: "Red",
      amount: 3.2,
    },
    {
      label: "Transport",
      color: "Green",
      amount: 2.4,
    },
    {
      label: "Energy",
      color: "Orange",
      amount: 2,
    },
    {
      label: "Schools and hospitals",
      color: "Yellow",
      amount: 1.1,
    },
    {
      label: "Food",
      color: "Blue",
      amount: 1.9,
    },
  ];
  await addClimateChangeData(climateCategory);
  await new Promise((r) => setTimeout(r, 2000));
});

test("Check default footprint", async (t) => {
  const title = Selector("#footprint");
  await t.expect(title.textContent).contains("Things you buy(3.2 Tons)");
  await t.expect(title.textContent).contains("Transport(2.4 Tons)");
  await t.expect(title.textContent).contains("Energy(2 Tons)");
  await t.expect(title.textContent).contains("Schools and hospitals(1.1 Tons)");
  await t.expect(title.textContent).contains("Food(1.9 Tons)");
});
