'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    static associate(models) {
      // Povezujemo OrderItems sa Orders i Coffees bez viška kolona
      OrderItems.belongsTo(models.Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
      OrderItems.belongsTo(models.Coffee, { foreignKey: 'coffeeId' });
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
    tableName: 'orderitems', // Ime tabele u bazi
    underscored: false // Održavamo camelCase format kao u bazi
  });
  return OrderItems;
};
