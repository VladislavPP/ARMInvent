module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        login: {
            type: Sequelize.STRING
        },
        pass: {
            type: Sequelize.STRING
        },
        roles: {
            type: Sequelize.STRING
        },
        edrpou: {
            type: Sequelize.STRING
        }
    });

    return Users;
};
