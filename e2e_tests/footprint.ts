import {Selector, ClientFunction, test} from "testcafe";
import ClimateData from "../data/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

fixture`Footprint tests`.page(URL).before(async (t) => {
  new ClimateData().setup();
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
