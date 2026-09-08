module.exports = (sequelize, Sequelize) => {
    const CreatedReports = sequelize.define("created_reports", {
        date: {
            type: Sequelize.STRING
        },
        name_report: {
            type: Sequelize.STRING
        },
        name_report_to_url: {
            type: Sequelize.STRING
        },
        edrpou: {
            type: Sequelize.STRING
        }
    });

    return CreatedReports;
};
