'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItemAddon extends Model {
    static associate(models) {
      // Povezivanje sa OrderItems i Addons
      OrderItemAddon.belongsTo(models.OrderItems, { foreignKey: 'orderItemId' });
      OrderItemAddon.belongsTo(models.Addon, { foreignKey: 'addonId' });
    }
  }
  OrderItemAddon.init({
    orderItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'OrderItems',
        key: 'id'
      }
    },
    addonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Addons',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'OrderItemAddon',
    tableName: 'orderitemaddons',
  });
  return OrderItemAddon;
};
