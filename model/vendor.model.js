const { Schema, default: mongoose } = require("mongoose");

const vendorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
})

const Vendor = mongoose.model('Vendor', vendorSchema)

exports.createVendorFromExport = function(vendorData) {
    const newVendor = new Vendor(vendorData)
    return newVendor.save()
}