var m = require("../models/serviceEntitiesModel");

exports.findAll = function(req, res) {
    var s= m.model(false);
    console.log('Retrieving all health_records');
   s.find({},function(err, items) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
        {
            console.log('fetch');
            res.send(items);
        }
    });
};
exports.findByName = function(req, res) {
    var name = req.params.name;
    var entityMod = m.model(false);
    console.log('Retrieving entity by Name: ' + name);
    //var ObjString = require('mongoose').Types.String;
    entityMod.findOne({name:name},function(err, item) {
        if (err){
            console.log("error retrieving entity by Name "+name);
        }
        else
            res.send(item);
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    var entityMod = m.model(false);
    console.log('Retrieving service entity by Id: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
   entityMod.findOne({_id: ObjectId.fromString(id)},function(err, item) {
        if (err){
            console.log("error retrieving doctor by ID "+id);
        }
        else
            res.send(item);
    });
};

exports.findByService = function(req, res) {
    var service= req.params.service;
    var entityMod = m.model(false);
    console.log('Retrieving entity: ' + service);
    var ObjectId = require('mongoose').Types.ObjectId;
   entityMod.find({"services" : { $in: [ service] }},function(err, items) {
        if (err){
            console.log("error retrieving entity"+service);
        }
        else
            res.send(items);
    });
};
exports.findByOnBoardDate = function(req, res) {
    var date = req.params.date;
    var entityMod = m.model(false);
    console.log('Retrieving entity: ' + date);
    var ObjectId = require('mongoose').Types.ObjectId;
   entityMod.find({onboard_date:new Date(date)},function(err, item) {
        if (err){
            console.log("error retrieving entity"+date);
        }
        else
            res.send(item);
    });
};


exports.addServiceEntity = function(req, res) {
    var entityMod = m.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    entityMod._id=ObjectId();
    entityMod.name = req.body.name;
    entityMod.type = req.body.type;
    entityMod.phone_contact = req.body.phone_contact;
    entityMod.email_contact = req.body.email_contact;
    entityMod.website = req.body.website;
    entityMod.logo = req.body.logo;
    entityMod.services = req.body.services;
    entityMod.write_up = req.body.write_up;
    entityMod.onboard_date = req.body.onboard_date;
    entityMod.address.streetaddress1 = req.body.address.streetaddress1;
    entityMod.address.streetaddress2 = req.body.address.streetaddress2;
    entityMod.address.city= req.body.address.city;
    entityMod.address.state = req.body.address.state;
    entityMod.address.zipcode = req.body.address.zipcode;
    entityMod.address.country = req.body.address.country;

 
    console.log('Adding service entity: ' + JSON.stringify(EntityMod));
    entityMod.save(function(error, data){
        if(error){
           res.json(error);
           console.log("error in insert");
                      console.log(error);

        }
        else{
            res.json(data);
            console.log("insert succesful");
        }
    });
}
exports.updateServiceEntityId = function(req, res) {
    //use findandmodify
    var entityMod = m.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
    var toFind = req.body._id;
    delete(req.body._id);
    entityMod.findOneAndUpdate({_id:ObjectId.fromString(toFind)}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });

}
exports.deleteServiceEntityId = function(req, res) {
    var servDt = m.model(false);
    var rId = req.body._id;
        var ObjectId = require('mongoose').Types.ObjectId;


    servDt.remove({ _id: ObjectId.fromString(rId) }, function(err, updated) {
        if (!err) {
            console.log('Deleting servDt: ' + rId);
            res.json(updated);
        }
        else {
           res.json(error);
        }
    });
}