import {Selector, ClientFunction} from "testcafe";

import {DbUtils} from "../backend/utils/db_utils";

//import DbUtils = require("../backend/utils/db_utils");
const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";
const getURL = ClientFunction(() => window.location.href);

const dbUtils = new DbUtils(process.env.TABLE_NAME);

fixture`Homepage tests`.page(URL).before(async (t) => {
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
      id: 124,
      label: "Energy",
      color: "Orange",
      amount: 2,
    },
    {
      id: 124,
      label: "Schools and hospitals",
      color: "Yellow",
      amount: 1.1,
    },
    {
      id: 124,
      label: "Food",
      color: "Blue",
      amount: 1.9,
    },
  ];
  await dbUtils.uploadTestData(climateCategory);
});

test("Assert page URL", async (t) => {
  await t.expect(getURL()).eql(URL);
});

test("Assert page title", async (t) => {
  const title = Selector("#page-title");
  await t.expect(title.textContent).eql("Planet saving expert");
});

test("Check default footprint", async (t) => {
  const title = Selector("#footprint");
  await t.expect(title.textContent).contains("Things you buy(3.2 Tons)");
  await t.expect(title.textContent).contains("Transport(2.4 Tons)");
  await t.expect(title.textContent).contains("Energy(2 Tons)");
  await t.expect(title.textContent).contains("Schools and hospitals(1.1 Tons)");
  await t.expect(title.textContent).contains("Food(1.9 Tons)");
});
