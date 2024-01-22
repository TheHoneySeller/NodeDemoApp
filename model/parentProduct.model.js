const { Schema, default: mongoose } = require("mongoose");

const parentProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor'}
})

const ParentProduct = mongoose.model('ParentProduct', parentProductSchema)

exports.getAllParentProducts = function () {
    return ParentProduct.find({})
}

exports.findProductsOfVendor = function (vendorId) { 
    return ParentProduct.find({ vendor: vendorId })
}