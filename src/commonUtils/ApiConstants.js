export const LOGIN_URL = {
    getStores: "/user-store/stores/getstores",
    getToken: "/user-management/auth/login",
    saveData: "/createData"
}
export const CREATE_DELIVERY_SLIP_URL = {
    getDeliverySlip: "/new-sale/newsale/getbarcodedetails",
    createDeliverySlip: "/new-sale/newsale/createdeliveryslip"
}

export const NEW_SALE_URL = {
    getDslipData: "/new-sale/newsale/getdeliveryslip",
    getMobileData: "/new-sale/newsale/getcustomerdetailsbymobilenuber",
    getNetAmount: "/new-sale/newsale/getHsnDetails",
    getDiscountReasons: "/new-sale/newsale/discTypes",
    saveSale: "/new-sale/newsale/sale"
}

export const CREATE_CUSTOMER_URL = {
    createCustomer: "/new-sale/newsale/savecustomerdetails",
    posClose: "/new-sale/newsale/daycloser",
}
export const GENERATE_RETURN_SLIPS_URL = {
    getInvoiceDetails: "/customer/customer/getInvoiceDetails",
    getMobileData: "/customer/customer/getCustomerDetails",
    saveCustomer: "/new-sale/newsale/savecustomerdetails",
    generateReturnSlip: "/customer/customer/createReturnSlip",
    getListOfReturnslips: "customer/getListOfReturnSlips"
}




export const TAG_CUSTOMER_TO_GV_URL = {

    getMobileData: "/new-sale/newsale/getcustomerdetailsbymobilenuber",

    getGvNumberData: "/new-sale/newsale/getGv",

    createTagCustomerToGv: "/new-sale/newsale/tagCustomerToGv"
}


export const PROMO_ITEM_EXCHANGE_URL = {
    getRTSlips: "/promo-exchange/promoItemExchange/getlistofreturnslips",
    getMobileData:"/promo-exchange/promoItemExchange/getcustomerdetailsbymobilenumber",
    getDsNumber: "/promo-exchange/promoItemExchange/getdeliveryslip",
    savePromo: "/promo-exchange/promoItemExchange/itemExchange"
}
export const TAG_CUSTOMER_URL = {
    getGiftData: "/new-sale/newsale/getGv",
    tagCustomer: "/new-sale/newsale/tagCustomerToGv"
 
}

