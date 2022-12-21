const {Category} = require("../models");
const ClimateData = require("./climateDatasource");
const {faker} = require("@faker-js/faker");

describe("The interactions with the database", () => {
  beforeEach(async () => {
    await Category.destroy({
      where: {},
      truncate: true,
    });
  });

  it("gets all the top level categories by default", async () => {
    const cat1label = faker.word.noun();
    const cat1cat = faker.word.noun();
    const cat2label = faker.word.noun();
    const cat2cat = faker.word.noun();
    const cat3label = faker.word.noun();
    const cat3cat = faker.word.noun();
    const cat1 = await Category.create({label: cat1label, category: cat1cat});
    const cat2 = await Category.create({label: cat2label, category: cat2cat});
    const cat3 = await Category.create({
      label: cat3label,
      category: cat3cat,
      parentId: cat1.id,
    });

    const dataSource = new ClimateData();
    const data = await dataSource.getClimateData();
    expect(data.length).toEqual(2);
    expect(data.map((c) => c.label)).toEqual([cat1label, cat2label]);
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
