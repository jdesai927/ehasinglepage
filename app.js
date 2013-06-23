var express = require('express'),
    path = require('path'),
    http = require('http'),
    urlparser = require('url'),
    partials = require('express-partials');




var app = express();

//Step 1 - Show the path for the routes
//doctors
var doctors = require('./routes/doctors');
var findByDocName=require('./routes/doctors');
var showOneDocBySpeciality=require('./routes/doctors');
var showDocBySpeciality=require('./routes/doctors');
var findDocById = require('./routes/doctors');
var showDocByAffliation = require('./routes/doctors');
var showTimeSlotsByDate= require('./routes/doctors');

//patients
var patients = require('./routes/patients');
var findPatById = require('./routes/patients');
var addPatient= require('./routes/patients');


//consultations
var consultations = require('./routes/consultations');
var findUserConsultationsByPatientID= require('./routes/consultations');
var findDoctorConsultationsByDoctorID= require('./routes/consultations');
var findUserConsultationsByPatientName= require('./routes/consultations');
var findDoctorConsultationsByDoctorName= require('./routes/consultations');
var findUserConsultationsByDate= require('./routes/consultations');
var findDoctorConsultationsByDate= require('./routes/consultations');
var findPresentandFutureUserConsultations= require('./routes/consultations');
var findPresentandFutureDoctorConsultations= require('./routes/consultations');



//health_records
var health_records = require('./routes/health_records');
var findHealth_RecordByPatId=require('./routes/health_records');
var findMedications=require('./routes/health_records');
var findVitals=require('./routes/health_records');
var findReports=require('./routes/health_records');
var findConsultations = require('./routes/health_records');
var findImmunizations = require('./routes/health_records');
var findAllergies = require('./routes/health_records');
var findLastVitals = require('./routes/health_records');
var findLastConsultation  = require('./routes/health_records');
var addUserConsultations = require('./routes/health_records');



global.SERVER_NAME = 'localhost:27017';

//MongoDB Related
global.DB_NAME = 'eha'; // obviously localized to my app - choose your own
var mongoDB = require('./models/db.js').init();


// CORS (Cross Origin Resource Sharing) Implementation
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


app.configure(function () {
    app.set('port', process.env.PORT || 3001);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'supersecretkeygoeshere'}));
    app.use(allowCrossDomain);
    app.use(app.router);
});

//Step 2 - define the gets and sets
// this would be the url to fire in the browser.for example to "showOneDocBySpeciality" ,the url will be "http://localhost:3001/doctors/showOneDocBySpeciality"
//doctors
app.get('/doctors', doctors.findAll);
app.get('/doctors/showDocByAffliation',doctors.showDocByAffliation);
app.get('/doctors/findDocById',doctors.findDocById) ;
app.get('/doctors/findByDocName',doctors.findByDocName);
app.get('/doctors/showOneDocBySpeciality',doctors.showOneDocBySpeciality);
app.get('/doctors/showDocBySpeciality',doctors.showDocBySpeciality);
app.get('/doctors/showTimeSlotsByDate',doctors.showTimeSlotsByDate);

//patients
app.get('/patients', patients.findAll);
app.get('/patients/findPatById',patients.findPatById);
//consultations
app.get('/consultations',consultations.findAll);
app.get('/consultations/findUserConsultationsByPatientID',consultations.findUserConsultationsByPatientID);
app.get('/consultations/findDoctorConsultationsByDoctorID',consultations.findDoctorConsultationsByDoctorID);
app.get('/consultations/findUserConsultationsByPatientName',consultations.findUserConsultationsByPatientName);
app.get('/consultations/findDoctorConsultationsByDoctorName',consultations.findDoctorConsultationsByDoctorName);
app.get('/consultations/findUserConsultationsByDate',consultations.findUserConsultationsByDate);
app.get('/consultations/findDoctorConsultationsByDate',consultations.findDoctorConsultationsByDate);
app.get('/consultations/findPresentandFutureUserConsultations',consultations.findPresentandFutureUserConsultations);
app.get('/consultations/findPresentandFutureDoctorConsultations',consultations.findPresentandFutureDoctorConsultations);
//app.put('/consultations/addUserConsultations',consultations.addUserConsultations);
// ^ this is broken

//healthRecords
app.get('/health_records',health_records.findAll);
app.get('/health_records/findHealth_RecordByPatId',health_records.findHealth_RecordByPatId);
app.get('/health_records/findMedications',health_records.findMedications);
app.get('/health_records/findConsultations',health_records.findConsultations);
app.get('/health_records/findVitals',health_records.findVitals);
app.get('/health_records/findReports',health_records.findReports);
app.get('/health_records/findImmunizations',health_records.findImmunizations);
app.get('/health_records/findAllergies',health_records.findAllergies);
app.get('/health_records/findLastVitals',health_records.findLastVitals);
app.get('/health_records/findLastConsultation',health_records.findLastConsultation);



//app.get('/patients', patients.findByAffinity);
//app.post('/addPatient', patients.addPatient);





//step 3 - Create actor/activity Model.js in models folder
//step 4 - Create actor/activity.js in routes folder




var server = http.createServer(app), io = require('socket.io').listen(server);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});