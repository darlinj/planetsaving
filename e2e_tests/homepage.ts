import {Selector} from "testcafe";

import {ClientFunction} from "testcafe";

const URL =
  process.env.ENVIRONMENT == "TEST"
    ? "https://test.planetsaving.uk/"
    : "http://localhost:3000/";
const getURL = ClientFunction(() => window.location.href);

fixture`My Fixture`.page(URL);

test("Assert page URL", async (t) => {
  await t.expect(getURL()).eql(URL);
});

test("Assert page title", async (t) => {
  const title = Selector("#page-title");
  await t.expect(title.textContent).eql("Planet saving expert");
});
