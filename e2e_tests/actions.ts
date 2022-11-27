import {Selector, ClientFunction} from "testcafe";
import {clearActions, addActions} from "./utils/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

fixture`Footprint tests`.page(URL).before(async (t) => {
  await clearActions();
  const actions = [
    {
      id: 123,
      title: "Reduce your thermostat by one degree",
      cost: 0,
      carbonSaved: 0.3,
      type: "energy",
    },
    {
      id: 124,
      title: "Buy an electric car",
      cost: 30000,
      carbonSaved: 1.0,
      type: "transport",
    },
    {
      id: 125,
      title: "Stop buying air freighted food",
      cost: 0,
      carbonSaved: 0.3,
      type: "food",
    },
    {
      id: 126,
      title: "Buy more second hand things",
      cost: 0,
      carbonSaved: 0.4,
      type: "purchasing",
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
