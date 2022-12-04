import {Selector, ClientFunction} from "testcafe";
import {clearActions, addActions} from "./utils/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

fixture`Footprint tests`.page(URL).before(async (t) => {
  await clearActions();
  const actions = [
    {
      title: "Reduce your thermostat by one degree",
      cost: 0,
      carbonSaved: 0.3,
      category: "energy",
    },
    {
      title: "Buy an electric car",
      cost: 30000,
      carbonSaved: 1.0,
      category: "transport",
    },
    {
      title: "Stop buying air freighted food",
      cost: 0,
      carbonSaved: 0.3,
      category: "food",
    },
    {
      title: "Buy more second hand things",
      cost: 0,
      carbonSaved: 0.4,
      category: "purchasing",
    },
  ];
  await addActions(actions);
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
