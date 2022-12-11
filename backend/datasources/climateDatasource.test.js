const {Category} = require("../models");
const ClimateData = require("./climateDatasource");

describe("The interactions with the database", () => {
  beforeEach(async () => {
    await Category.destroy({
      where: {},
      truncate: true,
    });
  });

  it("gets all the top level categories by default", async () => {
    const cat1 = await Category.create({label: "cat1", category: "top1"});
    const cat2 = await Category.create({label: "cat2", category: "top2"});
    const cat3 = await Category.create({
      label: "cat3",
      category: "top3",
      parentId: cat1.id,
    });

    const dataSource = new ClimateData();
    const data = await dataSource.getClimateData();
    expect(data.length).toEqual(2);
    expect(data.map((c) => c.label)).toEqual(["cat1", "cat2"]);
  });

  it("get lower level categories if a parent category is provided", async () => {
    const cat1 = await Category.create({label: "cat1", category: "top1"});
    const cat2 = await Category.create({label: "cat2", category: "top2"});
    const cat3 = await Category.create({
      label: "cat3",
      category: "top3",
      parentId: cat1.id,
    });

    const dataSource = new ClimateData();

    const data = await dataSource.getClimateData({parentCategory: "top1"});
    expect(data.length).toEqual(1);
    expect(data.map((c) => c.label)).toEqual(["cat3"]);
  });

  it("returns an empty record if the category does not exist", async () => {
    const cat1 = await Category.create({label: "cat1", category: "top1"});
    const cat3 = await Category.create({
      label: "cat3",
      category: "top3",
      parentId: cat1.id,
    });

    const dataSource = new ClimateData();

    const data = await dataSource.getClimateData({
      parentCategory: "idontexist",
    });
    expect(data.length).toEqual(0);
  });
});
