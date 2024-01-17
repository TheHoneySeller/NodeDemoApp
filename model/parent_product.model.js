const { Schema } = require("mongoose");

const parentProductSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    cart_item: [{
        product: Schema.Types.ObjectId,
        variantId: Schema.Types.ObjectId,
        series: String,
        item_count: Number, //to do: restrict to integers
        quantity: Number, //to do: restrict to integers
        cogs: Number,
        price: Number,  
        series: String,
        vendorMargin: Number,
        orderStatus: String
    }],
    paymentAt: Schema.Types.Date
})