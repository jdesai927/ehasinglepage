var patient_module = require("../models/patientModel")


/* Find a single patient */
exports.findPatById = function(req, res) {
    var id = req.params.id;
    var patients = patient_module.model(false);
    console.log('Retrieving patient: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
   patients.find({_id:ObjectId.fromString("51c1413a16aa2a7046cc0c77")},function(err, item) {
        if (err){
            console.log("error retrieving patient"+id);
        }
        else
            res.send(item);
    });
};

exports.logout = function(req, res) {
    console.log("destroying the session............");
    req.session.destroy();
}

exports.authenticateUser = function(req, res) {
    var crypto = require('crypto');
    var patients = patient_module.model(false);
    var uname = req.param('username', null);
    var passwd = req.param('password', null);
    console.log('Retrieving patient: ' + uname);
    if(uname && passwd)
    {
        patients.findOne({username:uname},function(err, item) {
            if (err){
                console.log("error retrieving patient"+uname);
                res.send(JSON.stringify(req.session));
            }
            else
            {
                if( item && item.password)
                {
                    var dbpasswd = item.password.split(':');
                    var user_pwd = passwd + dbpasswd[1];

                    var hash = crypto.createHash('md5').update(user_pwd).digest("hex");
                    if(hash === dbpasswd[0])
                    {
                        req.session.auth = uname;
                    }
                }
                res.send(JSON.stringify(req.session));
            }
        });
    }
    else
    {
        res.send(JSON.stringify(req.session));
    }
}


exports.findUserName = function(req, res) {
    var id = req.params.id;
    var patients = patient_module.model(false);
    console.log('Retrieving patient: ' + id);
    patients.findOne({username:id},function(err, item) {
        if (err){
            console.log("error retrieving patient"+id);
        }
        else
            res.send(item);
    });
};

exports.addPatient = function(req, res) {
    var patientMod = patient_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    /*patientMod._id = new ObjectId();
    patientMod.name.salute = req.body.name.salute;
    patientMod.name.first = req.body.name.first;
    patientMod.name.salute = req.body.name.salute;
    patientMod.mobile = req.body.mobile;
    patientMod.sex = req.body.sex;
    patientMod.date_of_birth = req.body.date_of_birth;
    patientMod.type = "Patient";*/
    patientMod._id = new ObjectId();
    patientMod.name.salute = "Ms";
    patientMod.name.first = "Meenu";
    patientMod.name.last = "Krishna";
    patientMod.mobile = "989202332";
    patientMod.sex = "female";
    patientMod.date_of_birth = new date("Sep 9,1990");
    patientMod.type = "Patient";

    console.log('Adding Patient: ' + JSON.stringify(patientMod));
    patientMod.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updatePatient = function(req, res) {
    var patientMod = patient_module.model(false);
    var tofind = req.body._id;
    delete(req.body._id);
    patientMod.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.deletePatient = function(req, res) {
    var patientMod = patient_module.model(false);
    var tofind = req.body._id;

    patientMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    })  ;
}

exports.findAll = function(req, res) {
    var patientMod = patient_module.model(false);
    console.log('Retrieving all patients');
    patientMod.find({type:"Patient"},function(err, items) {
        if (err){
            console.log("error retrieving all patients");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
