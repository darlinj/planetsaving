import {Selector, test} from "testcafe";
import ClimateData from "../data/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

fixture`personalizing`.page(URL).before(async (t) => {
  await new ClimateData().setup();
});

test("Clicking on a child category shows the form with the default user values", async (t) => {
  const transportLink = Selector("#transport");
  await t.click(transportLink);
  const drivingLink = Selector("#driving-footprint");
  await t.click(drivingLink);
  const footprint = Selector("#detail");
  await t.expect(footprint.textContent).contains("Driving");
  await t.expect(footprint.textContent).contains("Yearly Mileage");
  await t.expect(Selector("#annual-mileage").exists).ok;
  await t.expect(Selector("#annual-mileage").value).eql("9000");
  await t.expect(footprint.textContent).contains("Size of car");
  await t.expect(Selector("#size-of-car").exists).ok;
});
