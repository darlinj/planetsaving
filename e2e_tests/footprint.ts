import {Selector, ClientFunction} from "testcafe";

import {DbUtils} from "../backend/utils/db_utils";
import {climateDataTableName} from "../backend/tablenames";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";
const getURL = ClientFunction(() => window.location.href);

const dbUtils = new DbUtils(climateDataTableName);

fixture`Footprint tests`.page(URL).before(async (t) => {
  await dbUtils.emptyTable();
  const climateCategory = [
    {
      id: 123,
      label: "Things you buy",
      color: "Red",
      amount: 3.2,
    },
    {
      id: 124,
      label: "Transport",
      color: "Green",
      amount: 2.4,
    },
    {
      id: 125,
      label: "Energy",
      color: "Orange",
      amount: 2,
    },
    {
      id: 126,
      label: "Schools and hospitals",
      color: "Yellow",
      amount: 1.1,
    },
    {
      id: 127,
      label: "Food",
      color: "Blue",
      amount: 1.9,
    },
  ];
  await dbUtils.uploadTestData(climateCategory);
});

test("Check default footprint", async (t) => {
  const title = Selector("#footprint");
  await t.expect(title.textContent).contains("Things you buy(3.2 Tons)");
  await t.expect(title.textContent).contains("Transport(2.4 Tons)");
  await t.expect(title.textContent).contains("Energy(2 Tons)");
  await t.expect(title.textContent).contains("Schools and hospitals(1.1 Tons)");
  await t.expect(title.textContent).contains("Food(1.9 Tons)");
});
