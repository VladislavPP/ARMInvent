module.exports = (sequelize, Sequelize) => {
    const ServiceOrganizations = sequelize.define("service_organization", {
        title: {
            type: Sequelize.STRING
        },
        adress: {
            type: Sequelize.STRING
        },
        services_provided: {
            type: Sequelize.STRING
        },
        edrpou: {
            type: Sequelize.STRING
        }
    });

    return ServiceOrganizations;
};
