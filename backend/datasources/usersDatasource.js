const {DataSource} = require("apollo-datasource");
const {User} = require("../models");

class UsersDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async clearUsers() {
    User.destroy({
      truncate: true,
    });
  }

  async addUser(args) {
    return await User.create(args);
  }
}

module.exports = UsersDatasource;
