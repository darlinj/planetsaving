import {Selector} from "testcafe";

import {ClientFunction} from "testcafe";

const URL =
  process.env.ENVIRONMENT == "TEST"
    ? "https://test.planetsaving.uk/"
    : "http://localhost:3000/";
const getURL = ClientFunction(() => window.location.href);

fixture`Homepage tests`.page(URL);

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
