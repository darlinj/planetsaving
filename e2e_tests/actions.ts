import {Selector, ClientFunction} from "testcafe";
import {
  clearClimateData,
  clearActions,
  addActions,
  addClimateChangeRecord,
  addClimateChangeData,
} from "./utils/api_utils";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
  : "http://localhost:3000/";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

fixture`Footprint tests`.page(URL).before(async (t) => {
  await clearActions();
  await clearClimateData();

  const parentCategory = await addClimateChangeRecord({
    category: "eatables",
    label: "Eatables",
    color: "red",
    colorIntensity: 400,
    emitions: [
      {
        totalCarbonEmited: 1,
        name: "Some emition",
      },
    ],
  });
  const category = await addClimateChangeRecord(
    {
      category: "food",
      label: "Food",
      color: "red",
      colorIntensity: 400,
      emitions: [
        {
          totalCarbonEmited: 1,
          name: "Some emition",
        },
      ],
    },
    parentCategory.id
  );
  const categoryTwo = await addClimateChangeRecord({
    category: "drink",
    label: "Drink",
    color: "blue",
    colorIntensity: 400,
    emitions: [
      {
        totalCarbonEmited: 1,
        name: "Some emition",
      },
    ],
  });
  const actions = [
    {
      title: "Reduce your thermostat by one degree",
      cost: 0,
      carbonSaved: 0.3,
      categoryId: category.id,
    },
    {
      title: "Buy an electric car",
      cost: 30000,
      carbonSaved: 1.0,
      categoryId: category.id,
    },
    {
      title: "Stop buying air freighted food",
      cost: 0,
      carbonSaved: 0.3,
      categoryId: category.id,
    },
    {
      title: "Buy more second hand things",
      cost: 0,
      carbonSaved: 0.4,
      categoryId: categoryTwo.id,
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

test("Clicking on a category shows the actions associated with that category", async (t) => {
  const category = Selector("#eatables");
  await t.click(category);
  const actionList = Selector("#actions");
  await t
    .expect(actionList.textContent)
    .contains("Reduce your thermostat by one degree");
  await t
    .expect(actionList.textContent)
    .notContains("Buy more second hand things");
});
