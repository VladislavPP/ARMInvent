const db = require("../models");
const OperationsList = db.operationsList;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('ARMInvent', 'root', 'Qwaszx123!', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

// Create and Save a new OperationsList
exports.create = (req, res) => {

    // Validate request
    if (!req.body.type_operation) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a OperationsList
    const operationsList = {
        type_operation: req.body.type_operation,
        date: req.body.date,
        id_worker: req.body.id_worker,
        id_equipment: req.body.id_equipment,
        id_service_organization: req.body.id_service_organization,
        note: req.body.note,
        actual: req.body.actual,
        edrpou: req.body.edrpou,
    };

    // Save OperationsList in the database
    OperationsList.create(operationsList)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the OperationsList."
            });
        });
};

// Retrieve all OperationsList from the database.
exports.findAll = (req, res) => {
    sequelize.query("SELECT  operations_lists.id AS OperationsListID,\n" +
        "        operations_lists.type_operation AS OperationsListTypeOperation,\n" +
        "        DATE_FORMAT(operations_lists.date, '%d.%m.%Y') AS OperationsListDate,\n" +
        "        operations_lists.id_equipment AS EquipmentsID,\n" +
        "        operations_lists.id_worker AS WorkersID,\n" +
        "        operations_lists.actual AS OperationsListActual,\n" +
        "        operations_lists.note AS OperationsListNote,\n" +
        "        operations_lists.edrpou AS OperationsListEDRPOU,\n" +
        "        equipments.title AS EquipmentsValue,\n" +
        "        equipments.invent_n AS EquipmentsInventN,\n" +
        "        equipments.serial_n AS EquipmentsSerialN,\n" +
        "        workers.fio_full AS WorkersFIOFull,\n" +
        "        workers.position_full AS WorkersPositionFull,\n" +
        "        service_organizations.id AS ServiceOrganizationsID,\n" +
        "        service_organizations.title AS ServiceOrganizationsTitle\n" +
        "        \tFROM operations_lists\n" +
        "        \t\tLEFT JOIN workers ON operations_lists.id_worker = workers.id\n" +
        "        \t\tLEFT JOIN equipments ON operations_lists.id_equipment = equipments.id\n" +
        "        \t\tLEFT JOIN service_organizations ON operations_lists.id_service_organization = service_organizations.id").then(results => {
            res.send(results);
        }
    )
};


// Find a single OperationsList with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    sequelize.query("SELECT  operations_lists.id AS OperationsListID,\n" +
        "        operations_lists.type_operation AS OperationsListTypeOperation,\n" +
        "        DATE_FORMAT(operations_lists.date, '%d.%m.%Y') AS OperationsListDate,\n" +
        "        operations_lists.id_equipment AS EquipmentsID,\n" +
        "        operations_lists.id_worker AS WorkersID,\n" +
        "        operations_lists.actual AS OperationsListActual,\n" +
        "        operations_lists.note AS OperationsListNote,\n" +
        "        operations_lists.edrpou AS OperationsListEDRPOU,\n" +
        "        equipments.title AS EquipmentsValue,\n" +
        "        equipments.invent_n AS EquipmentsInventN,\n" +
        "        equipments.serial_n AS EquipmentsSerialN,\n" +
        "        workers.fio_full AS WorkersFIOFull,\n" +
        "        workers.position_full AS WorkersPositionFull,\n" +
        "        service_organizations.id AS ServiceOrganizationsID,\n" +
        "        service_organizations.title AS ServiceOrganizationsTitle\n" +
        "        \tFROM operations_lists\n" +
        "        \t\tLEFT JOIN workers ON operations_lists.id_worker = workers.id\n" +
        "        \t\tLEFT JOIN equipments ON operations_lists.id_equipment = equipments.id\n" +
        "        \t\tLEFT JOIN service_organizations ON operations_lists.id_service_organization = service_organizations.id\n" +
        "        \t\tWHERE operations_lists.id = " + id).then(results => {
            res.send(results);
        }
    )
};

// Update a OperationsList by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    OperationsList.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "OperationsList was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update OperationsList with id=${id}. Maybe OperationsList was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating OperationsList with id=" + id
            });
        });
};

// Delete a OperationsList with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    OperationsList.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "OperationsList was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete OperationsList with id=${id}. Maybe OperationsList was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete OperationsList with id=" + id
            });
        });
};

// Update status actual for OperationsList
exports.updateActual = (req, res) => {
    const idEquipment = req.params.idEquipment;

    sequelize.query("UPDATE operations_lists\n" +
        "    SET actual = 0\n" +
        "    WHERE id_equipment = " + idEquipment).then(results => {
        res.send(results);
        }
    )
};

