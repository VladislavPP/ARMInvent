module.exports = app => {
    const createdReports = require("../controllers/createdReports.controller");

    var router = require("express").Router();

    // Retrieve all CreatedReport
    router.get("/", createdReports.findAll);

    // Retrieve a single CreatedReport with id
    router.get("/:id", createdReports.findOne);

    // Delete a CreatedReport with id
    router.delete("/:id", createdReports.delete);

    // Delete a CreatedReport with id
    router.get("/download/:idReport", createdReports.download);

    app.use('/api/CreatedReports', router);
};
