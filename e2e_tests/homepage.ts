import {Selector} from "testcafe";

// fixture`Check homepage`.page`https://test.planetsaving.uk/`;

// test("Does homepage appear", async (t) => {
//   const developerNameInput = Selector("#site-title");

//   await t
//     .expect(developerNameInput.value)
//     .eql("planet saving expert", "Title is correct text");
// });

import {ClientFunction} from "testcafe";

const URL = "https://test.planetsaving.uk/";
const getURL = ClientFunction(() => window.location.href);

fixture`My Fixture`.page(URL);

test("Assert page URL", async (t) => {
  await t.expect(getURL()).eql(URL);
});
