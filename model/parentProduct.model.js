const { Schema } = require("mongoose");

const parentProductSchema = new Schema({
    name: String,
    vendor: Schema.Types.ObjectId
})