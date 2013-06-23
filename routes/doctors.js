var doc_module = require("../models/doctorModel")

/* Find a single Doctor */
exports.findDocById = function(req, res) {
    var id = req.params.id;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
   doctors.find({_id: ObjectId.fromString("51c46c6116aa2a7046cc0c7a")},function(err, item) {
        if (err){
            console.log("error retrieving doctor"+id);
        }
        else
            res.send(item);
    });
};

exports.showDocByAffliation = function(req, res) {
    var affinityGroup = req.params.affinityGroup;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor belonging to : ' + affinityGroup);
    doctors.find({ "type":"Doctor","affiliated_to.name" : affinityGroup}, 'name doctor.speciality', function (err, items) {
        if (err){
            console.log("error retrieving doctor belonging to " +affinityGroup);
        }
        else
            res.send(items);
    });
};

exports.showTimeSlotsByDate = function(req, res) {
    var affinityGroup = req.params.affinityGroup;
    var doctors = doc_module.model(false);
     var ObjectId = require('mongoose').Types.ObjectId;
    console.log('Retrieving doctor belonging to : ' + affinityGroup);
    doctors.find( 
        { _id: ObjectId.fromString("51c46c6116aa2a7046cc0c7a") 
    },'visiting_time.consultation_time').select({visiting_time: { $elemMatch: { consultation_day: "Monday" } } 
}) .exec(function (err, items) {
        if (err){
            console.log("error retrieving doctor belonging to " +affinityGroup);
        }
        else
            res.send(items);
    });
};
exports.showDocBySpeciality = function(req, res) {
    var speciality= req.params.speciality;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor specialised in : ' + speciality);
    doctors.find({ "doctor.speciality" : "General Physician"}, 'name doctor.speciality', function (err, items) {
        if (err){
            console.log("error retrieving doctor specialised in " +speciality);
        }
        else
            res.send(items);
    });
};

exports.showOneDocBySpeciality = function(req, res) {
    var speciality= req.params.speciality;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor specialised in : ' + speciality);
    doctors.findOne({ "doctor.speciality" : "General Physician"}, 'name doctor.speciality', function (err, item) {
        if (err){
            console.log("error retrieving doctor specialised in " +speciality);
        }
        else
            res.send(item);
    });
};


exports.findByDocName = function(req, res) {
    var doctorNameFirst = req.params.doctorNameFirst;
    var doctorNameLast = req.params.doctorNameLast;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor whose name is : ' + doctorNameFirst+ doctorNameLast);
    doctors.find({ "type":"Doctor","name.first" :doctorNameFirst,"name.last":doctorNameLast}, {"_id":0,"name":1 ,"doctor.speciality":1}, function (err, items) {
        if (err){
            console.log("error retrieving doctor whose name is " + doctorNameFirst+ doctorNameLast);
        }
        else
            res.send(items);
    });
};


exports.findUserName = function(req, res) {
    var id = req.params.id;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor: ' + id);
    doctors.findOne({username:id},function(err, item) {
        if (err){
            console.log("error retrieving doctor"+id);
        }
        else
            res.send(item);
    });
};

exports.findAll = function(req, res) {
    var docmod = doc_module.model(false);
    console.log('Retrieving all doctors');
    docmod.find({type:"Doctor"},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};




