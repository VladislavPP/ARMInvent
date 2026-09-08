const Sequelize = require('sequelize');
const fs = require("fs");

const sequelize = new Sequelize('ARMInvent', 'root', 'Qwaszx123!', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

exports.GenReport01 = (req, res) => {
    const id = req.params.id;

    sequelize.query("SELECT\n" +
        "\toperations_lists.id_equipment AS EquipmentsID,\n" +
        "\toperations_lists.id_worker AS WorkersID,\n" +
        "\tDATE_FORMAT(operations_lists.date, '%d.%m.%Y') AS OperationsListDate,\n" +
        "\toperations_lists.actual AS OperationsListActual,\n" +
        "\toperations_lists.edrpou AS OperationsListEDRPOU,\n" +
        "\tequipments.title AS EquipmentsValue,\n" +
        "\tequipments.invent_n AS EquipmentsInventN,\n" +
        "\tequipments.serial_n AS EquipmentsSerialN,\n" +
        "\tworkers.fio_full AS WorkersFIOFull,\n" +
        "\tworkers.position_full AS WorkersPositionFull\n" +
        "\t\tFROM operations_lists\n" +
        "\t\tLEFT JOIN workers ON operations_lists.id_worker = workers.id\n" +
        "\t\tLEFT JOIN equipments ON operations_lists.id_equipment = equipments.id\n" +
        "\t\tWHERE operations_lists.actual = 1 AND operations_lists.id_worker = " + id).then(results => {
        res.send(results);
        }
    )
};

exports.GenReport01TXT = (req, res) => {
    let fs = require('fs');

    let fileToGen = req.body;

    let serviceInfo = fileToGen[0];
    let reportInfo = fileToGen[1];

    let dateNow = Date.now();
    let dateOb = new Date(dateNow).toLocaleDateString();
    let timeOb = new Date(dateNow).toLocaleTimeString();

    let dateObSplit = dateOb.split('.');//31.01.2024
    let timeObSplit = timeOb.split(':');//11:47:00

    let userEDRPOU = serviceInfo;

    let fileValue = `Обладнання закріплене за працівником (сформований ${dateOb} о ${timeOb}) в *.TXT-файлі`;

    let fileUpload = '.\\CreatedReports\\TXT\\Report_01-'+dateOb+'-'+timeObSplit[0]+'-'+timeObSplit[1]+'-'+timeObSplit[2]+'.txt';

    let fileDownload = `/CreatedReports/TXT/Report_01-${dateOb}-${timeObSplit[0]}-${timeObSplit[1]}-${timeObSplit[2]}.txt`;

    let dateToInsert = String(`${dateObSplit[2]}-${dateObSplit[1]}-${dateObSplit[0]}`);

    sequelize.query(`INSERT INTO created_reports (date,name_report,name_report_to_url,edrpou) VALUES ('${dateToInsert}', '${fileValue}', '${fileDownload}', '${userEDRPOU}')`);

    fs.open(fileUpload, 'w', (err) => {
        if (err) throw err;
        for (let idx = 0; idx < reportInfo.length; idx++){
            let WorkersFIOFull = reportInfo[idx].WorkersFIOFull;
            let WorkersPositionFull = reportInfo[idx].WorkersPositionFull;
            let EquipmentsValue = reportInfo[idx].EquipmentsValue;
            let EquipmentsInventN = reportInfo[idx].EquipmentsInventN;
            let rowToFile = `${WorkersFIOFull}|${WorkersPositionFull}|${EquipmentsValue}|${EquipmentsInventN}\n`;
            fs.appendFileSync(fileUpload, rowToFile);
        }
    });
}

exports.GenReport01PDF = (req, res) => {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();

    let fileToGen = req.body;

    let serviceInfo = fileToGen[0];
    let reportInfo = fileToGen[1];

    let dateNow = Date.now();
    let dateOb = new Date(dateNow).toLocaleDateString();
    let timeOb = new Date(dateNow).toLocaleTimeString();

    let dateObSplit = dateOb.split('.');//31.01.2024
    let timeObSplit = timeOb.split(':');//11:47:00

    let userEDRPOU = serviceInfo;

    let fileValue = `Обладнання закріплене за працівником (сформований ${dateOb} о ${timeOb})  в *.PDF-файлі`;
    let fileDownload = `/CreatedReports/PDF/Report_01-${dateOb}-${timeObSplit[0]}-${timeObSplit[1]}-${timeObSplit[2]}.pdf`;
    let fileUpload = `.\\CreatedReports\\PDF\\Report_01-${dateOb}-${timeObSplit[0]}-${timeObSplit[1]}-${timeObSplit[2]}.pdf`;

    let dateToInsert = String(`${dateObSplit[2]}-${dateObSplit[1]}-${dateObSplit[0]}`);

    sequelize.query(`INSERT INTO created_reports (date,name_report,name_report_to_url,edrpou) VALUES ('${dateToInsert}', '${fileValue}', '${fileDownload}', '${userEDRPOU}')`);

    let WorkersFIOFull = reportInfo[0].WorkersFIOFull;
    let WorkersPositionFull = reportInfo[0].WorkersPositionFull;

    doc.pipe(fs.createWriteStream(fileUpload));
    doc.font('fonts/DejaVuSans.ttf').fontSize(6).text('Обладнання закріплене за працівником (станом на '+dateOb+')', { align: 'left', underline: true});
    doc.font('fonts/DejaVuSans.ttf').fontSize(14).text(' ');
    doc.font('fonts/DejaVuSans.ttf').fontSize(18).text(WorkersFIOFull, { align: 'center'});
    doc.font('fonts/DejaVuSans.ttf').fontSize(18).text(WorkersPositionFull, { align: 'center', underline: true});
    doc.font('fonts/DejaVuSans.ttf').fontSize(14).text(' ');

    for (let idx = 0; idx < reportInfo.length; idx++){
        let EquipmentsValue = reportInfo[idx].EquipmentsValue;
        let EquipmentsInventN = reportInfo[idx].EquipmentsInventN;
        let EquipmentsSerialN = reportInfo[idx].EquipmentsSerialN;
        let rowToFile = `${EquipmentsValue} (Інвентарний номер - ${EquipmentsInventN}; Серійний номер - ${EquipmentsSerialN})`;
        doc.font('fonts/DejaVuSans.ttf').fontSize(12).text(rowToFile);
        doc.font('fonts/DejaVuSans.ttf').fontSize(14).text(' ');
    }
    doc.end();
}

exports.GenReport02 = (req, res) => {
    const id = req.params.id;

    sequelize.query("SELECT  operations_lists.id AS OperationsListID,\n" +
        "        operations_lists.type_operation AS OperationsListTypeOperation,\n" +
        "        DATE_FORMAT(operations_lists.date, '%d.%m.%Y') AS OperationsListDate,\n" +
        "        operations_lists.id_equipment AS EquipmentsID,\n" +
        "        operations_lists.id_worker AS WorkersID,\n" +
        "        operations_lists.actual AS OperationsListActual,\n" +
        "        operations_lists.edrpou AS OperationsListEDRPOU,\n" +
        "        equipments.title AS EquipmentsValue,\n" +
        "        equipments.invent_n AS EquipmentsInventN,\n" +
        "        workers.fio_full AS WorkersFIOFull,\n" +
        "        workers.position_full AS WorkersPositionFull,\n" +
        "        service_organizations.id AS ServiceOrganizationsID,\n" +
        "        service_organizations.title AS ServiceOrganizationsTitle\n" +
        "        \tFROM operations_lists\n" +
        "        \t\tLEFT JOIN workers ON operations_lists.id_worker = workers.id\n" +
        "        \t\tLEFT JOIN equipments ON operations_lists.id_equipment = equipments.id\n" +
        "        \t\tLEFT JOIN service_organizations ON operations_lists.id_service_organization = service_organizations.id\n" +
        "        \t\tWHERE operations_lists.id_equipment = " + id).then(results => {
        res.send(results);
        }
    )
};

exports.GenReport02TXT = (req, res) => {
    let fs = require('fs');

    let fileToGen = req.body;

    let serviceInfo = fileToGen[0];
    let reportInfo = fileToGen[1];

    console.log(reportInfo)

    let dateNow = Date.now();
    let dateOb = new Date(dateNow).toLocaleDateString();
    let timeOb = new Date(dateNow).toLocaleTimeString();

    let dateObSplit = dateOb.split('.');//31.01.2024
    let timeObSplit = timeOb.split(':');//11:47:00

    let userEDRPOU = serviceInfo;

    let fileValue = `Історія руху обладнання (сформований ${dateOb} о ${timeOb}) в *.TXT-файлі`;

    let fileUpload = '.\\CreatedReports\\TXT\\Report_02-'+dateOb+'-'+timeObSplit[0]+'-'+timeObSplit[1]+'-'+timeObSplit[2]+'.txt';

    let fileDownload = `/CreatedReports/TXT/Report_02-${dateOb}-${timeObSplit[0]}-${timeObSplit[1]}-${timeObSplit[2]}.txt`;

    let dateToInsert = String(`${dateObSplit[2]}-${dateObSplit[1]}-${dateObSplit[0]}`);

    sequelize.query(`INSERT INTO created_reports (date,name_report,name_report_to_url,edrpou) VALUES ('${dateToInsert}', '${fileValue}', '${fileDownload}', '${userEDRPOU}')`);

    fs.open(fileUpload, 'w', (err) => {
        if (err) throw err;
        for (let idx = 0; idx < reportInfo.length; idx++){
            let OperationsListDate = reportInfo[idx].OperationsListDate;
            let OperationsListTypeOperation = typeOperation(reportInfo[idx].OperationsListTypeOperation);
            let WorkersFIOFull = reportInfo[idx].WorkersFIOFull;
            let WorkersPositionFull = reportInfo[idx].WorkersPositionFull;
            let EquipmentsValue = reportInfo[idx].EquipmentsValue;
            let EquipmentsInventN = reportInfo[idx].EquipmentsInventN;
            let ServiceOrganizationsTitle = reportInfo[idx].ServiceOrganizationsTitle;
            let rowToFile = `${OperationsListDate}|${OperationsListTypeOperation}|${WorkersFIOFull}|${WorkersPositionFull}|${EquipmentsValue}|${EquipmentsInventN}|${ServiceOrganizationsTitle}\n`;
            fs.appendFileSync(fileUpload, rowToFile);
        }
    });
}

exports.GenReport02PDF = (req, res) => {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();

    let fileToGen = req.body;

    let serviceInfo = fileToGen[0];
    let reportInfo = fileToGen[1];

    let dateNow = Date.now();
    let dateOb = new Date(dateNow).toLocaleDateString();
    let timeOb = new Date(dateNow).toLocaleTimeString();

    let dateObSplit = dateOb.split('.');//31.01.2024
    let timeObSplit = timeOb.split(':');//11:47:00

    let userEDRPOU = serviceInfo;

    let fileValue = `Історія руху обладнання (сформований ${dateOb} о ${timeOb})  в *.PDF-файлі`;
    let fileDownload = `/CreatedReports/PDF/Report_02-${dateOb}-${timeObSplit[0]}-${timeObSplit[1]}-${timeObSplit[2]}.pdf`;
    let fileUpload = `.\\CreatedReports\\PDF\\Report_02-${dateOb}-${timeObSplit[0]}-${timeObSplit[1]}-${timeObSplit[2]}.pdf`;

    let dateToInsert = String(`${dateObSplit[2]}-${dateObSplit[1]}-${dateObSplit[0]}`);

    sequelize.query(`INSERT INTO created_reports (date,name_report,name_report_to_url,edrpou) VALUES ('${dateToInsert}', '${fileValue}', '${fileDownload}', '${userEDRPOU}')`);

    let EquipmentsValue = reportInfo[0].EquipmentsValue;
    let EquipmentsInventN = reportInfo[0].EquipmentsInventN;
    let EquipmentsSerialN = reportInfo[0].EquipmentsSerialN;

    doc.pipe(fs.createWriteStream(fileUpload));
    doc.font('fonts/DejaVuSans.ttf').fontSize(6).text('Історія руху обладнання', { align: 'left', underline: true});
    doc.font('fonts/DejaVuSans.ttf').fontSize(14).text(' ');
    doc.font('fonts/DejaVuSans.ttf').fontSize(18).text(EquipmentsValue, { align: 'center'});
    doc.font('fonts/DejaVuSans.ttf').fontSize(8).text(' ');
    doc.font('fonts/DejaVuSans.ttf').fontSize(10).text('Інвентарний номер: ' + EquipmentsInventN, { align: 'left', underline: true});
    doc.font('fonts/DejaVuSans.ttf').fontSize(10).text(' ');
    doc.font('fonts/DejaVuSans.ttf').fontSize(10).text('Серійний номер: ' + EquipmentsSerialN, { align: 'left', underline: true});
    doc.font('fonts/DejaVuSans.ttf').fontSize(10).text(' ');

    for (let idx = 0; idx < reportInfo.length; idx++){
        let OperationsListDate = reportInfo[idx].OperationsListDate.substring(0, 10);
        let OperationsListTypeOperation = typeOperation(reportInfo[idx].OperationsListTypeOperation);
        let WorkersFIOFull = reportInfo[idx].WorkersFIOFull;
        let ServiceOrganizationsTitle = reportInfo[idx].ServiceOrganizationsTitle;

        let rowToFile = `${OperationsListDate}. ${OperationsListTypeOperation} - ${WorkersFIOFull} - ${ServiceOrganizationsTitle}`;
        doc.font('fonts/DejaVuSans.ttf').fontSize(10).text(rowToFile);
        doc.font('fonts/DejaVuSans.ttf').fontSize(14).text(' ');
    }
    doc.end();
}


exports.GenReport03 = (req, res) => {
    const date = req.params.date;

    sequelize.query("SELECT  operations_lists.id AS OperationsListID,\n" +
        "        operations_lists.type_operation AS OperationsListTypeOperation,\n" +
        "        DATE_FORMAT(operations_lists.date, '%d.%m.%Y') AS OperationsListDate,\n" +
        "        operations_lists.id_equipment AS EquipmentsID,\n" +
        "        operations_lists.id_worker AS WorkersID,\n" +
        "        operations_lists.actual AS OperationsListActual,\n" +
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
        "        \t\tWHERE operations_lists.date <= '" + date + "' and operations_lists.actual = 1 ORDER BY equipments.id").then(results => {
            res.send(results);
        }
    )
};

exports.GenReport03XLSX = async (req, res) => {
    const Excel = require('exceljs');
    let fileToGen = req.body;
    let workbook = new Excel.Workbook();

    let serviceInfo = fileToGen[0];
    let reportInfo = fileToGen[1];

    let dateForCreateReport = serviceInfo.dateReport;
    let userEDRPOU = serviceInfo.EDRPOU;

    let dateNow = Date.now();
    let dateOb = new Date(dateNow).toLocaleDateString();
    let timeOb = new Date(dateNow).toLocaleTimeString();

    let dateObSplit = dateOb.split('.');//31.01.2024
    let timeObSplit = timeOb.split(':');//11:47:00

    let fileValue = `ЗВІТ. Матеріально-відповідальні особи (сформований ${dateOb} о ${timeOb})  в *.XLSX-файлі`;
    let fileDownload = `/CreatedReports/XLSX/Report_03-${dateOb}-${timeObSplit[0]}-${timeObSplit[1]}-${timeObSplit[2]}.xlsx`;
    let fileUpload = `..\\..\\CreatedReports\\XLSX\\Report_03-${dateOb}-${timeObSplit[0]}-${timeObSplit[1]}-${timeObSplit[2]}.xlsx`;

    let dateToInsert = String(`${dateObSplit[2]}-${dateObSplit[1]}-${dateObSplit[0]}`);

    sequelize.query(`INSERT INTO created_reports (date, name_report, name_report_to_url, edrpou)
                     VALUES ('${dateToInsert}', '${fileValue}', '${fileDownload}', '${userEDRPOU}')`);

    let A2 = `ЗВІТ. МАТЕРІАЛЬНО-ВІДПОВІДАЛЬНІ ОСОБИ НА ${dateForCreateReport}р.`;

    let tRow = 6;

    await workbook.xlsx.readFile('.\\CreatedReports\\BLANK\\Report03.xlsx');

    new Promise((res, rej) => {
        workbook.eachSheet((worksheet, sheetId) => {

            res(worksheet.getCell(`A2`).value = A2);
            worksheet.getCell(`E${tRow}`).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'}
            };
            res(worksheet.getCell(`A2`).alignment = {vertical: 'middle', horizontal: 'center'});

            for (let idx = 0; idx <= reportInfo.length; idx++) {

                res(worksheet.getCell(`A${tRow}`).value = reportInfo[idx].WorkersFIOFull);
                worksheet.getCell(`A${tRow}`).border = {
                    top: {style: 'thin'},
                    left: {style: 'thin'},
                    bottom: {style: 'thin'},
                    right: {style: 'thin'}
                };
                res(worksheet.getCell(`A${tRow}`).alignment = {vertical: 'middle', horizontal: 'center'});

                res(worksheet.getCell(`B${tRow}`).value = reportInfo[idx].EquipmentsValue);
                worksheet.getCell(`B${tRow}`).border = {
                    top: {style: 'thin'},
                    left: {style: 'thin'},
                    bottom: {style: 'thin'},
                    right: {style: 'thin'}
                };
                res(worksheet.getCell(`B${tRow}`).alignment = {vertical: 'middle', horizontal: 'center'});

                res(worksheet.getCell(`C${tRow}`).value = reportInfo[idx].EquipmentsInventN);
                worksheet.getCell(`C${tRow}`).border = {
                    top: {style: 'thin'},
                    left: {style: 'thin'},
                    bottom: {style: 'thin'},
                    right: {style: 'thin'}
                };
                res(worksheet.getCell(`C${tRow}`).alignment = {vertical: 'middle', horizontal: 'center'});

                res(worksheet.getCell(`D${tRow}`).value = reportInfo[idx].EquipmentsSerialN);
                worksheet.getCell(`D${tRow}`).border = {
                    top: {style: 'thin'},
                    left: {style: 'thin'},
                    bottom: {style: 'thin'},
                    right: {style: 'thin'}
                };
                res(worksheet.getCell(`D${tRow}`).alignment = {vertical: 'middle', horizontal: 'center'});

                res(worksheet.getCell(`E${tRow}`).value = reportInfo[idx].OperationsListDate);
                worksheet.getCell(`E${tRow}`).border = {
                    top: {style: 'thin'},
                    left: {style: 'thin'},
                    bottom: {style: 'thin'},
                    right: {style: 'thin'}
                };
                res(worksheet.getCell(`E${tRow}`).alignment = {vertical: 'middle', horizontal: 'center'});

                tRow++
            }

        })
    }).then(workbook.xlsx.writeFile(`${__dirname}\\${fileUpload}`));
    res.end()
}

function typeOperation(typeOpp){
    let returnData = '';
    switch (typeOpp) {
        case 1: returnData = 'Внутрішнє переміщення'; break;
        case 2: returnData = 'Відправка на ремонт'; break;
        case 3: returnData = 'Придбання'; break;
    }
    return returnData;
}