module.exports = app => {
    const workers = require("../controllers/workers.controller.js");

    var router = require("express").Router();

    // Create a new Workers
    router.post("/", workers.create);

    // Retrieve all Workers
    router.get("/", workers.findAll);

    // Retrieve a single Workers with id
    router.get("/:id", workers.findOne);

    // Update a Workers with id
    router.put("/:id", workers.update);

    // Delete a Workers with id
    router.delete("/:id", workers.delete);

    app.use('/api/workers', router);
};
