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
        queryInterface.addColumn('Answers', 'correct', {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['1', '0']
        }, { transaction }),
        queryInterface.addColumn('Answers', 'value', {
          type: Sequelize.STRING,
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
