const { Schema, default: mongoose } = require("mongoose");

const parentProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    vendor: Schema.Types.ObjectId
})

const ParentProduct = mongoose.model('ParentProduct', parentProductSchema)

exports.createParentProductFromExport = function(parentProductData) {
    const newParentProduct = new ParentProduct(parentProductData)
    return newParentProduct.save()
}