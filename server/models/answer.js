'use strict';
const { Model } = require('sequelize');
const Question = require('./question');
const sequelize = require('../utils/sequalize-connection');
const { DataTypes } = require('sequelize');

class Answer extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Answer.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  questionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Question,
      key: 'id'
    }
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  correct: {
    type: DataTypes.STRING(1),
    allowNull: false
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Answer',
});

module.exports = Answer;