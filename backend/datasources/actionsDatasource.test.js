const {Action, Category} = require("../models");
const ActionsDatasource = require("./actionsDatasource");

describe("The interactions with the database", () => {
  beforeEach(async () => {
    await Action.destroy({
      where: {},
      truncate: true,
    });
    await Category.destroy({
      where: {},
      truncate: true,
    });
  });

  it("gets all the actions by default", async () => {
    const action1 = await Action.create({title: "some action"});
    const action2 = await Action.create({title: "some other action"});

    const dataSource = new ActionsDatasource();
    const data = await dataSource.getActions();
    expect(data.length).toEqual(2);
    expect(data.map((c) => c.title)).toEqual([
      "some action",
      "some other action",
    ]);
  });

  it("gets the actions that are relevant to the parent category", async () => {
    const parentCat1 = await Category.create({
      label: "Parent Cat1",
      category: "topcat1",
    });
    const parentCat2 = await Category.create({
      label: "Parent Cat2",
      category: "topcat2",
    });
    const cat1 = await Category.create({
      label: "cat1",
      category: "subcat1",
      parentId: parentCat1.id,
    });
    const cat2 = await Category.create({
      label: "cat2",
      category: "subcat2",
      parentId: parentCat1.id,
    });
    const cat3 = await Category.create({
      label: "cat3",
      category: "subcat3",
      parentId: parentCat2.id,
    });
    const action1 = await Action.create({
      title: "some action",
      categoryId: cat1.id,
    });
    const action2 = await Action.create({
      title: "some other action",
      categoryId: cat2.id,
    });
    const action3 = await Action.create({
      title: "some third action",
      categoryId: cat3.id,
    });

    const dataSource = new ActionsDatasource();
    const data = await dataSource.getActions({
      parentCategory: "topcat1",
    });
    // We should not see the third actions as it is not connected to the parent ID
    expect(data.map((c) => c.title)).toEqual([
      "some action",
      "some other action",
    ]);
  });
});
