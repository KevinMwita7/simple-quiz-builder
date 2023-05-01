'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      quizId: {
        type: Sequelize.UUID,
        references: {
          model: 'Quizzes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      correctAnswers: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};