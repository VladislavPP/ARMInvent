module.exports = (sequelize, Sequelize) => {
    const OperationsList = sequelize.define("operations_lists", {
        type_operation: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        id_worker: {
            type: Sequelize.STRING
        },
        id_equipment: {
            type: Sequelize.STRING
        },
        id_service_organization: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        },
        actual: {
            type: Sequelize.BOOLEAN
        },
        edrpou: {
            type: Sequelize.STRING
        }
    });

    return OperationsList;
};