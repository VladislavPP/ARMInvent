module.exports = app => {
    const reports = require("../controllers/reports.controller.js");

    var router = require("express").Router();

    //Generate ListReports
    router.get("/", reports.GenReport01);

    //Generate ReportA01
    router.get("/GenReport01/:id", reports.GenReport01);

    //Generate ReportA01TXT
    router.post("/GenReport01TXT", reports.GenReport01TXT);

    //Generate ReportA01PDF
    router.post("/GenReport01PDF", reports.GenReport01PDF);

    //Generate ReportA02
    router.get("/GenReport02/:id", reports.GenReport02);

    //Generate ReportA02TXT
    router.post("/GenReport02TXT", reports.GenReport02TXT);

    //Generate ReportA02PDF
    router.post("/GenReport02PDF", reports.GenReport02PDF);

    //Generate ReportA03
    router.get("/GenReport03/:date", reports.GenReport03);

    //Generate ReportA03XLSX
    router.post("/GenReport03XLSX", reports.GenReport03XLSX);

    app.use('/api/Reports', router);
};
