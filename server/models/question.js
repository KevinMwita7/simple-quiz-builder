'use strict';
const { Model } = require('sequelize');
const Quiz = require('./quiz');
const sequelize = require('../utils/sequalize-connection');
const { DataTypes } = require('sequelize');

class Question extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Question.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  quizId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Quiz,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  correctAnswers: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Question',
});

module.exports = Question;