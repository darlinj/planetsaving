import {Selector, ClientFunction} from "testcafe";

const URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
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
