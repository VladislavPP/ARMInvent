module.exports = (sequelize, Sequelize) => {
    const Workers = sequelize.define("workers", {
        fio_full: {
            type: Sequelize.STRING
        },
        fio_small: {
            type: Sequelize.STRING
        },
        position_full: {
            type: Sequelize.STRING
        },
        position_small: {
            type: Sequelize.STRING
        },
        edrpou: {
            type: Sequelize.STRING
        }
    });

    return Workers;
};
