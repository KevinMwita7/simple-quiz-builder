'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.changeColumn('Quizzes', 'userId', {
          type: Sequelize.UUID,
          allowNull: false
        }, { transaction }),
        queryInterface.changeColumn('Questions', 'quizId', {
          type: Sequelize.UUID,
          allowNull: false
        }, { transaction }),
        queryInterface.changeColumn('Answers', 'questionId', {
          type: Sequelize.UUID,
          allowNull: false
        }, { transaction })
      ])
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
