var express = require('express'),
    path = require('path'),
    http = require('http'),
    urlparser = require('url'),
    partials = require('express-partials');



var app = express();

var server = http.createServer(app),
    io = require('socket.io').listen(server);




//Step 1 - Show the path for the routes
//doctors
var doctors = require('./routes/doctors');
//patients
var patients = require('./routes/patients');
//consultations
var consultations = require('./routes/consultations');
//health_records
var health_records = require('./routes/healthRecords');
//serviceEntity
var service_entity = require('./routes/serviceEntities');



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

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


io.sockets.on('connection', function (socket) {
    socket.on('createConsultation', function(data){
        socket.broadcast.emit('onCreateConsultation', data);
    })  ;

    socket.on('cancelConsultation', function(data){
        socket.broadcast.emit('onCancelConsultation', data);
    });

    socket.on('updateConsultation', function(data){
        socket.broadcast.emit('onUpdateConsultation', data);
    });


});



//Step 2 - define the gets and sets
// this would be the url to fire in the browser.for example to "showOneDocBySpeciality" ,the url will be "http://localhost:3001/doctors/showOneDocBySpeciality"
//doctors
app.get('/doctors', doctors.findAll);
app.get('/doctors/showDocByAffiliation/:affinityGroup',doctors.showDocByAffiliation);
app.get('/doctors/:id',doctors.findDocById) ;
app.get('/doctors/findByName/?:fName&:lName',doctors.findByDocName);
app.get('/doctors/speciality/byOne:speciality',doctors.showOneDocBySpeciality);
app.get('/doctors/speciality/:speciality',doctors.showDocBySpeciality);
app.get('/doctors/showTimeSlotsByDate',doctors.showTimeSlotsByDate);
app.get('/doctors/showBlockedTimeSlotsByDate',doctors.showBlockedTimeSlotsByDate);
app.post('/doctors/addDoctorPersonal',doctors.addDoctorPersonal);
app.delete('/doctors/deleteDoctor',doctors.deleteDoctor);
app.put('/doctors/updateDoctorTechnical',doctors.updateDoctorTechnical);
//app.put('/doctors/updateBlockedTime/:id',doctors.updateBlockedTime);

app.get('/serviceEntities', service_entity.findAll);
app.get('/serviceEntities/:id',service_entity.findById);
app.post('/serviceEntities/add',service_entity.addServiceEntity);
app.put('/serviceEntities/update',service_entity.updateServiceEntityId);
app.delete('/serviceEntities/delete',service_entity.deleteServiceEntityId);
app.get('/serviceEntities/findByName/:name',service_entity.findByName);
app.get('/serviceEntities/findByID/:id',service_entity.findById);
app.get('/serviceEntities/findByService/:service',service_entity.findByService);
app.get('/serviceEntities/findByOnBoardDate/:date',service_entity.findByOnBoardDate);


//patients
app.get('/patients', patients.findAll);
app.get('/patients/findPatById',patients.findPatById);
app.post('/patients/addPatient',patients.addPatient);
app.delete('/patients/deletePatient',patients.deletePatient);
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
app.post('/consultations/addUserConsultations',consultations.addUserConsultations);
app.delete('/consultations/deleteUserConsultations',consultations.deleteUserConsultations);
app.put('/consultations/updateStatusbyConsultationsId',consultations.updateStatusbyConsultationsId);
app.put('/consultations/updateLastVitalsbyConsultationsId',consultations.updateLastVitalsbyConsultationsId);
app.put('/consultations/updateLastConsultationbyConsultationsId',consultations.updateLastConsultationbyConsultationsId);
//app.put('/consultations/updateDatebyConsultationsId',consultations.updateDatebyConsultationsId);

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
app.post('/health_records/addUserHealthRecord',health_records.addUserHealthRecord);
app.put('/health_records/addConsultation',health_records.addConsultation);
app.put('/health_records/addVitals',health_records.addVitals);
app.put('/health_records/addMedications',health_records.addMedications);
app.put('/health_records/addReports',health_records.addReports);
app.delete('/health_records/deleteUserHealthRecordbyPatientId',health_records.deleteUserHealthRecordbyPatientId);











//step 3 - Create actor/activity Model.js in models folder
//step 4 - Create actor/activity.js in routes folder




