'use strict';
const { Model } = require('sequelize');
const debug = require('debug')('quizzer:quiz');
const sequelize = require('../utils/sequalize-connection');
const { DataTypes } = require('sequelize');
let nanoid;
// Have to use dynamic import. nanoid does not support CommonJS require
import('nanoid').then(m => {
  nanoid = m.nanoid
}).catch(err => debug(err))
const User = require('./user');
const Questions = require('./question');
const Answers = require('./answer');

class Quiz extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Quiz.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permalink: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  publishedAt: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Quiz',
});

// Associations have to be put in one file else sequelize throws an error
Quiz.belongsTo(User, { foreignKey: 'userId' });
Quiz.hasMany(Questions, { foreignKey: 'quizId' });
Questions.belongsTo(Quiz, { foreignKey: 'quizId' });
Questions.hasMany(Answers, { foreignKey: 'questionId' });
Answers.belongsTo(Questions, { foreignKey: 'questionId' });

module.exports =  Quiz;