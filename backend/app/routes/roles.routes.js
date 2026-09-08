module.exports = app => {
    const roles = require("../controllers/roles.controller");

    var router = require("express").Router();

    // Create a new Roles
    router.post("/", roles.create);

    // Retrieve all Roles
    router.get("/", roles.findAll);

    // Retrieve a single Roles with id
    router.get("/:id", roles.findOne);

    // Update a Roles with id
    router.put("/:id", roles.update);

    // Delete a Roles with id
    router.delete("/:id", roles.delete);

    app.use('/api/roles', router);
};
