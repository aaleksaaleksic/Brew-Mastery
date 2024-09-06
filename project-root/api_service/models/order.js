'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order ima više kafa kroz pivot tabelu OrderItems
      // Koristi samo `orderId` i `coffeeId` definisane u pivot tabeli
      Order.hasMany(models.OrderItems, { foreignKey: 'orderId',onDelete: 'CASCADE' });
    }
  }
  Order.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
