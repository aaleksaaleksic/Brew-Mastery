'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Coffee, { foreignKey: 'coffeeId' }); // Veza sa Coffee modelom
      // Ne direktno, već preko auth servisa - Review.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Review.init({
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coffeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Coffees',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false // Povezaćemo sa korisnikom preko JWT tokena
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
