const { Schema, default: mongoose } = require("mongoose");

const vendorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
})

const Vendor = mongoose.model('Vendor', vendorSchema)

