'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const now = new Date();
    await queryInterface.bulkInsert('Users', [
      { name: 'Jose Rizal', email: 'rizal@library.test',
      createdAt: now, updatedAt: now },
      { name: 'Francisco Balagtas', email: 'balagtas@library.test',
      createdAt: now, updatedAt: now },
    ]);

    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    
    const idOf = (name) => users.find((a) => a.name === name).id;
      await queryInterface.bulkInsert('Tasks', [
        { title: "Finished ITELECT2", completed: true, dueDate: "2026-08-04",
          userId: idOf('Jose Rizal'), createdAt: now, updatedAt: now },
        { title: "Find RRLS na mahirap hirap gawin", completed: false, dueDate: "2026-08-05",
          userId: idOf('Jose Rizal'), createdAt: now, updatedAt: now },
        { title: "ITMETRE Paper", completed: true, dueDate: "2026-08-04",
          userId: idOf('Francisco Balagtas'), createdAt: now, updatedAt: now },
        { title: "Ethikos Quiz", completed: false, dueDate: "2026-08-05",
          userId: idOf('Francisco Balagtas'), createdAt: now, updatedAt: now },
    ]);






    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
