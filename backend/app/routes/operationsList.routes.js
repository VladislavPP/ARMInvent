module.exports = app => {
    const operationsList = require("../controllers/operationsList.controller.js");

    var router = require("express").Router();

    // Create a new OperationsList
    router.post("/", operationsList.create);

    // Retrieve all OperationsList
    router.get("/", operationsList.findAll);

    // Retrieve a single OperationsList with id
    router.get("/:id", operationsList.findOne);

    // Update a OperationsList with id
    router.put("/:id", operationsList.update);

    // Delete a OperationsList with id
    router.delete("/:id", operationsList.delete);

    // Update status Actual for OperationsList Table
    router.put("/updateActual/:idEquipment", operationsList.updateActual);

    app.use('/api/operationsList', router);
};
