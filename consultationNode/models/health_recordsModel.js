var mongoose = require('mongoose');
var db = require('./db.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = {
    _schema: null,

    _schema_def: {
          _id: ObjectId
        , patient_name: String
        , patient_ID: ObjectId
        ,dateCreated : Date
        , consultations: [{patient_name : String,patient_ID:  ObjectId,doctor_name:String,doctor_ID: ObjectId,consultation_date:Date,consultation_slot:String,consultation_mode:String,consultation_reason:String,created_by:String,status:String,diagnosis:String}]
        , vitals : [{temperature:String,SBP:String,DBP:String,Weight:String,date_of_capture:Date}]
        , reports : [{name: String,  date_of_capture: Date, file_src: String}]
        , medications :[{name: String, dosage: String, duration: String, date_prescribed: Date}]
        , immunizations:[{name: String,date_of_capture: Date,comments:String}]
        , allergies:[{name: String,date_of_capture: Date,comments:String}]
        
    },



schema: function(){
        if (!module.exports._schema){
            module.exports._schema = new mongoose.Schema(module.exports._schema_def);
        }

        return module.exports._schema;
    },

    _model: null,

    model: function(new_instance){
        if (!module.exports._model){
            var schema = module.exports.schema();
            mongoose.model('health_records', schema);
            module.exports._model = mongoose.model('health_records');
        }

        return new_instance ?
            new module.exports._model() :
            module.exports._model;
    }
}