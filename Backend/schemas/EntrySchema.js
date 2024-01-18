const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const EntrySchema = new Schema({
    number: String,
    day: String,
    date: String,
    entryTime: String,
}, {
    collection: 'current-parking-data'
});

const EntryModel = model('Entry' , EntrySchema);

module.exports = EntryModel;
