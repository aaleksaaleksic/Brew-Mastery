'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addon extends Model {
    static associate(models) {
      // Definišemo many-to-many vezu između Addon i OrderItems
      Addon.belongsToMany(models.OrderItems, { through: 'OrderItemAddons', foreignKey: 'addonId' });
    }
  }
  Addon.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Addon',
  });
  return Addon;
};
