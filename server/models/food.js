'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Food extends Model {}

  Food.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ingredients: DataTypes.STRING,
    tag: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, { sequelize });

  Food.associate = function(models) {
    Food.belongsTo(models.User)
  };
  return Food;
};