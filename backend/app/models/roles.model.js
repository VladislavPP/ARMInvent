module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        value: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        onlySuperadmin: {
            type: Sequelize.BOOLEAN
        },
    });

    return Roles;
};
