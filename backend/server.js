const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors())
app.use(express.json({limit: '20mb'}));
// const path = __dirname + '/app/views/';
// app.use(express.static(path));

var corsOptions = {

  origin: '127.0.0.1:3000',//localhost
  //origin: '139.28.37.15:3000', //webhost

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOptions));


app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // next();
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '127.0.0.1:3000');//localhost
  //res.header('Access-Control-Allow-Origin', '139.28.37.15:3000');//webhost


  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With', 'X-HTTP-Method-Override');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
      exposedHeaders: ["authorization"], // you can change the headers
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
);

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Vlad application." });
});

require("./app/routes/equipments.routes")(app);
require("./app/routes/workers.routes")(app);
require("./app/routes/operationsList.routes")(app);
require("./app/routes/serviceOrganizations.routes")(app);
require("./app/routes/reports.routes")(app);
require("./app/routes/roles.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/createdReports.routes")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
