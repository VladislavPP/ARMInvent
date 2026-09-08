module.exports = app => {
    const serviceOrganizations = require("../controllers/serviceOrganizations.controller.js");

    var router = require("express").Router();

    // Create a new ServiceOrganizations
    router.post("/", serviceOrganizations.create);

    // Retrieve all ServiceOrganizations
    router.get("/", serviceOrganizations.findAll);

    // Retrieve a single ServiceOrganizations with id
    router.get("/:id", serviceOrganizations.findOne);

    // Update a ServiceOrganizations with id
    router.put("/:id", serviceOrganizations.update);

    // Delete a ServiceOrganizations with id
    router.delete("/:id", serviceOrganizations.delete);

    app.use('/api/serviceOrganizations', router);
};
