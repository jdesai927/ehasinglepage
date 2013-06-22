var consultations_module = require("../models/consultationsModel");

/* Find consultations by user and date */
exports.findUserConsultationsByPatientID = function(req, res) {
    var id = req.param('patientId', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77")},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findDoctorConsultationsByDoctorID = function(req, res) {
    var id = req.param('doctorId', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({doctor_ID:ObjectId.fromString("51bc49c2c2ae8f9f0b3a481a")},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findUserConsultationsByPatientName = function(req, res) {
    var name = req.param('patientName', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations: ' + name);
   
    consultations.find({patient_name:"Ms. Vinitha Ravichandran"},function(err, items) {
        if (err){
            console.log("error retrieving Consultations: " + name);
        }
        else
        {   res.send(items);
        }
    });
};

exports.findDoctorConsultationsByDoctorName = function(req, res) {
    var name = req.param('doctorName', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations: ' + name);
   
    consultations.find({doctor_name:"Dr. Nivedhita Davey"},function(err, items) {
        if (err){
            console.log("error retrieving Consultations: " + name);
        }
        else
        {   res.send(items);
        }
    });
};


/* Find consultations by user and date */
exports.findUserConsultationsByRole = function(req, res) {
    var id = req.param('patientId', null);
    var userRole = req.param('userRole', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for : ' + id + ' with Role: ' + userRole);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({patient_ID:ObjectId.fromString(id), created_by:ObjectId.fromString(userRole)},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

/* Find consultations by user and date */
exports.findUserConsultationsByDate = function(req, res) {
    //var id = req.param('patientId', null);
    var consulDate = req.param('consulDate', null);
    console.log(consulDate)
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for Date: ' + consulDate);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77"),consultation_date: new Date("Jun 22,2013")},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + consulDate);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findPresentandFutureUserConsultations = function(req, res) {
    //var id = req.param('patientId', null);
    var consulDate = req.param('consulDate', null);
    var present_date= new Date("Jun 16, 2013");
    var future_date = new Date("Jun 16, 2014");
    console.log(consulDate)
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for Date: ' + consulDate);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77"),consultation_date: {$gte: present_date, $lt: future_date}},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + consulDate);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findPresentandFutureDoctorConsultations = function(req, res) {
    //var id = req.param('patientId', null);
    var consulDate = req.param('consulDate', null);
    var present_date= new Date("Jun 16, 2013");
    var future_date = new Date("Jun 16, 2014");
    console.log(consulDate)
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for Date: ' + consulDate);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({doctor_ID:ObjectId.fromString("51bc49c2c2ae8f9f0b3a481a"),consultation_date: {$gte: present_date, $lt: future_date}},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + consulDate);
        }
        else
        {   res.send(item);
        }
    });
};
exports.findDoctorConsultationsByDate = function(req, res) {
    //var id = req.param('patientId', null);
    var consulDate = req.param('consulDate', null);
    console.log(consulDate)
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for Date: ' + consulDate);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({doctor_ID:ObjectId.fromString("51bc49c2c2ae8f9f0b3a481a"),consultation_date: new Date("Jun 22,2013")},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + consulDate);
        }
        else
        {   res.send(item);
        }
    });
};
/*exports.addUserConsultations = function(req, res) {
    var consultationsMod = consultations_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultationsMod._id = new ObjectId();
    consultationsMod.ConsultationCreatedBy = req.body.ConsultationCreatedBy;
    consultationsMod.ConsultationDateTime = req.body.ConsultationDateTime;
    consultationsMod.ConsultationTime = req.body.ConsultationTime;
    consultationsMod.ConsultationType = req.body.ConsultationType;
    consultationsMod.DoctorComments = req.body.DoctorComments;
    consultationsMod.DoctorDiagnosis = req.body.DoctorDiagnosis;
    consultationsMod.DoctorId = req.body.DoctorId;
    consultationsMod.PatientId = req.body.PatientId;
    consultationsMod.PatientComments = req.body.PatientComments;
    consultationsMod.QualityRating = req.body.QualityRating;
    consultationsMod.Reason4Visit = req.body.Reason4Visit;
    consultationsMod.SpecialityID = req.body.SpecialityID;
    consultationsMod.RoleType = req.body.RoleType;

    console.log('Adding Consultations: ' + JSON.stringify(consultationsMod));
    consultationsMod.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserConsultationsId = function(req, res) {
    var consultationsMod = consultations_module.model(false);
    var tofind = req.body._id;
    delete(req.body._id);
    consultationsMod.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.deleteUserConsultations = function(req, res) {
    var consultationsMod = consultations_module.model(false);
    var tofind = req.body._id;

    consultationsMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}
*/
exports.findAll = function(req, res) {
    var consultationsMod = consultations_module.model(false);
    console.log('Retrieving all Consultations');
    consultationsMod.find({},function(err, items) {
        if (err){
            console.log("error retrieving all Consultations");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
