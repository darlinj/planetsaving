import {Selector, ClientFunction} from "testcafe";
import ClimateData from "../data/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

fixture`Footprint tests`.page(URL).before(async (t) => {
  new ClimateData().setup();
  await new Promise((r) => setTimeout(r, 2000));
});

test("Check default actions list", async (t) => {
  const actionsList = Selector("#actions");
  await t
    .expect(actionsList.textContent)
    .contains("Reduce your thermostat by one degree");
  await t.expect(actionsList.textContent).contains("Buy an electric car");
  await t
    .expect(actionsList.textContent)
    .contains("Stop buying air freighted food");
  await t
    .expect(actionsList.textContent)
    .contains("Buy more second hand things");
});

test("Clicking on a category shows the actions associated with that category", async (t) => {
  const category = Selector("#energy");
  await t.click(category);
  const actionList = Selector("#actions");
  await t
    .expect(actionList.textContent)
    .contains("Reduce your thermostat by one degree");
  await t
    .expect(actionList.textContent)
    .notContains("Buy more second hand things");
});
