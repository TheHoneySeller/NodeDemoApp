const supplierPanelController = require(/controller/supplierPanel.controller)

exports.routerConfig = function (app) {
    app.get('/monthlysales', [
        //to do: security middleware
        supplierPanelController.getMonthlySales
    ])
    app.get('totalproductsales', [
        //to do: Security middleware
        supplierPanelController.getTotalProductSales
    ])
}