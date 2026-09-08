module.exports = app => {
    const equipments = require("../controllers/equipments.controller.js");

    var router = require("express").Router();

    // Create a new Equipments
    router.post("/", equipments.create);

    // Retrieve all Equipments
    router.get("/", equipments.findAll);

    // Retrieve a single Equipments with id
    router.get("/:id", equipments.findOne);

    // Update a Equipments with id
    router.put("/:id", equipments.update);

    // Delete a Equipments with id
    router.delete("/:id", equipments.delete);

    // Find id last added equipment
    router.get("/lastId/:edrpou", equipments.findLastId);

    // Disactive
    router.get("/disactive/:id", equipments.disactive);

    app.use('/api/equipments', router);
};
