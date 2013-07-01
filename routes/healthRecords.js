var health_records_module = require("../models/healthRecordsModel");

exports.findAll = function(req, res) {
    var health_recordsMod= health_records_module.model(false);
    console.log('Retrieving all health_records');
   health_recordsMod.find({},function(err, items) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};

exports.findHealth_RecordByPatId = function(req, res) {
    var id = req.param('patientId', null);
    var health_records = health_records_module.model(false);
    console.log('Retrieving health_record: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    health_records.findOne({patient_ID:ObjectId.fromString("51bc292dc2ae8f9f0b3a4812")},function(err, item) {
        if (err){
            console.log("error retrieving health_record: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findMedications = function(req, res) {
    var id = req.param('patientId', null);
    var health_records = health_records_module.model(false);
    console.log('Retrieving health_record: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    health_records.findOne({patient_ID:ObjectId.fromString("51bc292dc2ae8f9f0b3a4812")},'patient_name medications',function(err, item) {
        if (err){
            console.log("error retrieving health_record: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findMedicationsByDate = function(req, res) {
    var id = req.param('patientId', null);
    var health_records = health_records_module.model(false);
    console.log('Retrieving health_record: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    health_records.findOne({patient_ID:ObjectId.fromString("51bc292dc2ae8f9f0b3a4812")},'patient_name medications',function(err, item) {
        if (err){
            console.log("error retrieving health_record: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findVitals = function(req, res) {
    var id = req.param('patientId', null);
    var health_records = health_records_module.model(false);
    console.log('Retrieving health_record: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    health_records.findOne({patient_ID:ObjectId.fromString("51bc292dc2ae8f9f0b3a4812")},'patient_name vitals',function(err, item) {
        if (err){
            console.log("error retrieving health_record: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findReports = function(req, res) {
    var id = req.param('patientId', null);
    var health_records = health_records_module.model(false);
    console.log('Retrieving health_record: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    health_records.findOne({patient_ID:ObjectId.fromString("51bc292dc2ae8f9f0b3a4812")},'patient_name reports',function(err, item) {
        if (err){
            console.log("error retrieving health_record: " + id);
        }
        else
        {   res.send(item);
        }
    });
};


exports.findConsultations = function(req, res) {
    var health_recordsMod= health_records_module.model(false);
    console.log('Retrieving all health_records');
    var ObjectId = require('mongoose').Types.ObjectId;
   health_recordsMod.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77")},'patient_name consultations',function(err, item) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
            res.send(item);
    });
};

exports.findAllergies = function(req, res) {
    var health_recordsMod= health_records_module.model(false);
    console.log('Retrieving all health_records');
    var ObjectId = require('mongoose').Types.ObjectId;
   health_recordsMod.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77")},'patient_name allergies',function(err, item) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
            res.send(item);
    });
};

exports.findImmunizations = function(req, res) {
    var health_recordsMod= health_records_module.model(false);
    console.log('Retrieving all health_records');
    var ObjectId = require('mongoose').Types.ObjectId;
   health_recordsMod.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77")},'patient_name immunizations',function(err, item) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
            res.send(item);
    });
};

exports.findLastVitals = function(req, res) {
    var health_recordsMod= health_records_module.model(false);
    console.log('Retrieving all health_records');
    var ObjectId = require('mongoose').Types.ObjectId;
   health_recordsMod.aggregate({ $match : {patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77") } },{$unwind: '$vitals'}, {$sort: {'vitals.date_of_capture': -1}}, {$group: {_id:{ _id: '$_id'}, vital: {$first: '$vitals'}}},{$project: {vital:1}}
  ,function(err, item) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
            res.send(item);
    });
};

exports.findLastConsultation = function(req, res) {
    var health_recordsMod= health_records_module.model(false);
    console.log('Retrieving all health_records');
    var ObjectId = require('mongoose').Types.ObjectId;
   health_recordsMod.aggregate({ $match : {patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77")} },{$unwind: '$consultations'}, 
    {$sort: {'consultations.consultation_date': -1}}, {$group: { _id:{ _id: '$_id'},consultation: {$first: '$consultations'}}},{$project: {consultation:1}}
  ,function(err, item) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
            res.send(item);
    });
};

exports.addUserHealthRecord = function(req, res) {
   var health_recordsMod= health_records_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    health_recordsMod._id = new ObjectId();
    health_recordsMod.patient_name=req.body.patient_name;
    health_recordsMod.patient_ID = ObjectId.fromString(req.body.patient_ID);
    console.log('Adding health_record: ' + JSON.stringify(health_recordsMod));
    health_recordsMod.save(function(error, data){
        if(error){
           res.json(error);
           console.log("error in insert");
        }
        else{
            res.json(data);
            console.log("insert succesful");
        }
    });
};
    
exports.deleteUserHealthRecordbyPatientId = function(req, res) {
      var health_recordsMod= health_records_module.model(false);

   
     var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);

    health_recordsMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
};
exports.addConsultation = function(req, res) {
     var health_recordsMod= health_records_module.model(false);

   
     var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);
    health_recordsMod.findOneAndUpdate({_id:tofind},
        { $pushAll: 
            { "consultations": [
    {patient_name: req.body.patient_name,
  patient_ID:ObjectId.fromString( req.body.patient_ID),
  doctor_name: req.body.doctor_name,
 doctor_ID: ObjectId.fromString( req.body.doctor_ID),
  consultation_date: new Date(req.body.consultation_date),
 consultation_slot : req.body.consultation_slot,
  consultation_mode :  req.body.consultation_mode,
  consultation_reason : req.body.consultation_reason,
  created_by: ObjectId.fromString( req.body.created_by),
  status: "Complete",
    diagnosis: req.body.diagnosis
      }
    ]} },{upsert:true,new:true},function (err, health_recordsMod){
        
      if (!err) {
        console.log("updated");
        console.log(health_recordsMod)
      } else {
        console.log(err);
        console.log("error");
      
      return res.send(health_recordsMod);
    }
});
};
exports.addVitals = function(req, res) {
     var health_recordsMod= health_records_module.model(false);

   
     var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);
    health_recordsMod.findOneAndUpdate({_id:tofind},
        { $pushAll: {vitals :  [{     temperature: req.body.temperature,  SBP: req.body.SBP, DBP: req.body.DBP,Weight: req.body.Weight,  date_of_capture: new Date(req.body.date_of_capture)
  }]         }  },{upsert:true,new:true},function (err, health_recordsMod){
        
      if (!err) {
        console.log("updated");
        console.log(health_recordsMod)
      } else {
        console.log(err);
        console.log("error");
      
      return res.send(health_recordsMod);
    }
});
};
exports.addMedications = function(req, res) {
     var health_recordsMod= health_records_module.model(false);

   
     var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);
    health_recordsMod.findOneAndUpdate({_id:tofind},
        { $pushAll: {medications: [
    {name: req.body.name,
    dosage: req.body.dosage,
    duration: req.body.duration,
    date_prescribed: new Date(req.body.date_prescribed)
      }
    ]         }  },{upsert:true,new:true},function (err, health_recordsMod){
        
      if (!err) {
        console.log("updated");
        console.log(health_recordsMod)
      } else {
        console.log(err);
        console.log("error");
      
      return res.send(health_recordsMod);
    }
});
};
exports.addReports = function(req, res) {
     var health_recordsMod= health_records_module.model(false);

   
     var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);
    health_recordsMod.findOneAndUpdate({_id:tofind},
        { $pushAll: {reports: [
      {
        name:req.body.name,
        date_of_capture: new Date(req.body.date_of_capture),
        file_src : req.body.file_src
        }]         }  },{upsert:true,new:true},function (err, health_recordsMod){
        
      if (!err) {
        console.log("updated");
        console.log(health_recordsMod)
      } else {
        console.log(err);
        console.log("error");
      
      return res.send(health_recordsMod);
    }
});
};



