'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, { foreignKey: 'userId' })
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: 'name is required' } }
    },
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeValidate: (user) => {
        if (user.name) user.name = user.name.trim();
      }
    }


  });
  return User;
};