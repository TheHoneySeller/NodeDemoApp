const VendorModel = require("../model/vendor.model")
const OrderModel = require("../model/order.model")
const ParentProductModel = require("../model/parentProduct.model")


exports.getMonthlySales = function(request, response) {
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

}

exports.getTotalProductSales = function(request, response) {
    ParentProductModel.findProductsOfVendor(request.query.vendorId).then( (result, error) => {
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
}