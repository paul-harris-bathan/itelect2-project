'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {                                            

      const values = { ...this.get() };

      delete values.password;

      return values;

    }
  }
  Account.init({
    email: {

      type: DataTypes.STRING,

      allowNull: false,          

      unique: true,             

      validate: {               

        notEmpty: { msg: 'email is required' },

        isEmail: { msg: 'email must look like an email address' }

      }

    },

    password: {

      type: DataTypes.STRING,

      allowNull: false,        

      validate: { notEmpty: { msg: 'password is required' } }   

    },

    role: {

      type: DataTypes.STRING,

      allowNull: false,          

      defaultValue: 'member'     

    }
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};