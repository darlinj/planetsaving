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
    return await User.create(args.user);
  }

  async addOrUpdateUser(args) {
    const user = await User.findOne({where: {id: args.id}});
    if (user) {
      for (let key in args.user) {
        if (args.user[key] !== null) {
          user[key] = args.user[key];
        }
      }
      await user.save();
      return user;
    } else {
      return await User.create(args.user);
    }
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
