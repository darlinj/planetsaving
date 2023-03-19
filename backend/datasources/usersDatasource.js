const {DataSource} = require("apollo-datasource");
const {User} = require("../models");

class UsersDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async clearAverageJoeUser() {
    User.destroy({
      where: {
        name: "AVERAGE JOE",
      },
      truncate: true,
    });
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
