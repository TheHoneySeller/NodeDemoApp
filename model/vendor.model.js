const { Schema } = require("mongoose");

const vendorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
})