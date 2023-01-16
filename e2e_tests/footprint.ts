import {Selector, ClientFunction, test} from "testcafe";
import ClimateData from "../data/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

let didSetup = false;
fixture`Footprint tests`.page(URL).before(async (t) => {
  if (!didSetup) {
    await new ClimateData().setup();
    didSetup = true;
  }
});

test("Check default footprint", async (t) => {
  const footprint = Selector("#footprint");
  await t.expect(footprint.textContent).contains("Miscellaneous");
  await t.expect(footprint.textContent).contains("Transport");
  await t.expect(footprint.textContent).contains("Energy");
  await t.expect(footprint.textContent).contains("Schools and hospitals");
  await t.expect(footprint.textContent).contains("Food");
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
    .contains("Total 11.2 Tons of CO2 equivalent");
});
