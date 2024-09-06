'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coffee extends Model {
    static associate(models) { //ovde definisem entity relationship po potrebi
        Coffee.belongsTo(models.Category, { foreignKey: 'categoryId'});
    }
  }
  Coffee.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Coffee',
  });
  return Coffee;
};
