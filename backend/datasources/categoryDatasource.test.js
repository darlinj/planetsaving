const {Category} = require("../models");
const CategoryDatasource = require("./categoryDatasource");
// const {faker} = require("@faker-js/faker");

describe("The interactions with the database", () => {
  beforeEach(async () => {
    await Category.destroy({
      where: {},
      truncate: true,
    });
    // await Emission.destroy({
    //   where: {},
    //   truncate: true,
    // });
  });

  it("get lower level categories ", async () => {
    const cat1 = await Category.create({label: "cat1", category: "top1"});
    const cat2 = await Category.create({label: "cat2", category: "top2"});
    const cat3 = await Category.create({
      label: "cat3",
      category: "top3",
      parentId: cat1.id,
    });

    const dataSource = new CategoryDatasource();

    const data = await dataSource.getCategoryData({category: "top1"});
    expect(data.children.length).toEqual(1);
    expect(data.children.map((c) => c.label)).toEqual(["cat3"]);
  });
});
