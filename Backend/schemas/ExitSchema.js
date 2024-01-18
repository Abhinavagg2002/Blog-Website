const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const ExitSchema = new Schema({
    number: String,
    day: String,
    date: String,
    entryTime: String,
    exitTime: String,
}, {
    collection: 'parking-summary'
});

const ExitModel = model('Exit' , ExitSchema);

module.exports = ExitModel;