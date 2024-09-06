'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    static associate(models) {
      OrderItems.belongsTo(models.Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
      OrderItems.belongsTo(models.Coffee, { foreignKey: 'coffeeId' });
      // Povezujem OrderItems sa Addons preko pivot tabele OrderItemAddons
      OrderItems.belongsToMany(models.Addon, { through: 'OrderItemAddons', foreignKey: 'orderItemId' });
    }
  }
  OrderItems.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    coffeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Coffees',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderItems',
    tableName: 'orderitems',
    underscored: false
  });
  return OrderItems;
};
