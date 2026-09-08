module.exports = (sequelize, Sequelize) => {
    const Equipments = sequelize.define("equipments", {
        title: {
            type: Sequelize.STRING
        },
        invent_n: {
            type: Sequelize.STRING
        },
        serial_n: {
            type: Sequelize.STRING
        },
        new: {
            type: Sequelize.BOOLEAN
        },
        actual: {
            type: Sequelize.BOOLEAN
        },
        edrpou: {
            type: Sequelize.STRING
        }
    });

    return Equipments;
};
