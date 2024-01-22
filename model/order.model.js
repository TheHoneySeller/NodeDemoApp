const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    cart_item: [{
        product: { type: Schema.Types.ObjectId, ref: 'ParentProduct'},
        variantId: Schema.Types.ObjectId,
        series: String,
        item_count: Number, 
        quantity: Number,
        cogs: Number,
        price: Number,  
        vendor_margin: Number,
        order_status: String,
        _id: Schema.Types.ObjectId
    }],
    payment_at: Schema.Types.Date
})

const Order = mongoose.model('Order', orderSchema)

exports.getMonthlySales = function(productIds) {
    return Order.aggregate([
        { $unwind: { path: "$cart_item" } },
        { $match: { 'cart_item.product': { $in: productIds } } },
        { $project: { quantity: '$cart_item.quantity', year: {$year: '$payment_at'}, month: {$month: '$payment_at'} } },
        { $group: { _id: { year: '$year', month: '$month' }, 
                    total_sales_month: {$sum: '$quantity'} } }
    ])
}

