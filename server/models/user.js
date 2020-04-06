'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, 
  { hooks: {
    beforeCreate(user, opt){
      {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    }
  },
    sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Food)
  };
  return User;
};