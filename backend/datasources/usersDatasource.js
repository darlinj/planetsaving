const {DataSource} = require("apollo-datasource");
const {User} = require("../models");

class UsersDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async clearAverageJoeUser() {
    const joe = await User.findOne({
      where: {
        name: "AVERAGE JOE",
      },
    });
    joe && (await joe.destroy());
  }

  async addUser(args) {
    return await User.create(args);
  }

  async getUser(args) {
    return await User.findOne({
      where: {
        id: args.id,
      },
    });
  }

  async getUserByName(username) {
    return await User.findOne({
      where: {
        name: username,
      },
    });
  }
}

module.exports = UsersDatasource;
