const VendorModel = require("../model/vendor.model")
const OrderModel = require("../model/order.model")
const ParentProductModel = require("../model/parentProduct.model")
const mongoose = require('mongoose')


exports.getMonthlySales = function(request, response) {
    const vendorId = request.query.vendorId

    if (mongoose.Types.ObjectId.isValid(vendorId)) {
        ParentProductModel.findProductsOfVendor(request.query.vendorId).then( (result, error) => {
            if (error) {
                console.log(error)
            } else {
                productIds = result.map( (o) => o._id)
    
                OrderModel.getMonthlySales(productIds).then( (resultInner, errorInner) => {
                    if (errorInner) {
                        console.log(errorInner)
                    } else {
                        response.status(200).send(resultInner)
                    }
                } )
            }
        } )
    } else {
        response.status(418).send({})
    }
    

}

exports.getTotalProductSales = function(request, response) {
    const vendorId = request.query.vendorId

    
    if (mongoose.Types.ObjectId.isValid(vendorId)) {
        ParentProductModel.findProductsOfVendor(vendorId).then( (result, error) => {
            if (error) {
                console.log(error)
            } else {
                productIds = result.map( (o) => o._id)
    
                OrderModel.getTotalSalesByProduct(productIds).then( (resultInner, errorInner) => {
                    if (errorInner) {
                        console.log(errorInner)
                    } else {
                        response.status(200).send(resultInner)
                    }
                } )
            }
        } )
    } else {
        response.status(418).send({})
    }

    
}