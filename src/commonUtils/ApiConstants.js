export const LOGIN_URL = {
    getStores: "/user-store/stores/getstores",
    getToken: "/user-management/auth/temporary-login",
    saveData: "/createData",
    registerUser: "/user-management/client/create-client",
    changePassword: "/user-management/auth/auth-challenge",
    sendVerificationCode: "/user-management/auth/resetUserPassword",
    forgotPassword: "/user-management/auth/confirmforgetPassword"
};

export const MAIN_DASHBOARD = {
    getTodaysSale: "/new-sale/reports/gettodaysSale",
    getMonthlySale: "/new-sale/reports/getMonthlySale",
    getLastVsThisMonthSale: "/new-sale/reports/getcurrentMonthSalevsLastMonth",
    getTopFiveSalesRepresentative: "/new-sale/reports/getTopFiveSalesByRepresentative",
    getSalesByCategory: "/new-sale/reports/getSalesByCategory"
};

export const ACCOUNTS_DASHBOARD = {
    debitNotesByStores: "/hsn-details/reports/debitNotesByStores",
    usedBalancedAmounts: "/hsn-details/reports/usedAndBalancedAmountByStores",
};

export const CREATE_DELIVERY_SLIP_URL = {
    getDeliverySlip: "/inventory/inventory-management/barcode-details",
    createDeliverySlip: "/new-sale/newsale/createdeliveryslip",
    getLineItems: "/new-sale/newsale/savelineitems",
    saveDelivery: "/new-sale/newsale/createdeliveryslip",
    getRetailBarcode: "/inventory/inventoryRetail/getBarcodeId",
    addCustomer: "/user-management/auth/create-user",
    getMobileData: "/new-sale/newsale/getcustomerdetailsbymobilenuber",

    getGvNumberData: "/new-sale/newsale/getGv",

    createTagCustomerToGv: "/new-sale/newsale/tagCustomerToGv",
    getReturnSlips: "/new-sale/newsale/getInvoiceDetails",
    // saveReturnSlip: "/customer/customer/createReturnSlip",
    saveReturnSlip: "/new-sale/return_slip/createReturnSlip",
    getCustomerMobile: "/user-management/user/customer/mobileNo",
    getGiftVochers: "/new-sale/newsale/getlistofgv",
    saveGiftVoucher: "/new-sale/newsale/saveGv",
    // searchGiftVoucher:"/new-sale/newsale/searchingBy",
    searchGiftVoucher: "/new-sale/newsale//gvSearching",
    changeGvFlag: "/new-sale/newsale/changeflaggv",
    getDayCloserSlips: "/new-sale/newsale/getPendingDeliverySlips",
    dayCloserPendingDeliverySlips: "/new-sale/newsale/closePendingDeliverySlips"

};

export const NEW_SALE_URL = {
    getDslipData: "/new-sale/newsale/getdeliveryslip",
    getDsAsbarcode: "/inventory/inventory-management/scan-barcode",
    getMobileData: "/new-sale/newsale/getcustomerdetailsbymobilenuber",
    getNetAmount: "/new-sale/newsale/getHsnDetails",
    getDiscountReasons: "/new-sale/newsale/discTypes",
    getCreditNotes: "/hsn-details/accounting/getCreditNotes",
    saveSale: "/new-sale/newsale/sale",
    getCoupons: "/new-sale/newsale/getGv",
    // getHsnDetails: "/hsn-details/hsnDetails/getHsnDetails",
    getHsnDetails: "/hsn-details/hsn-details/getHsnDetails",
    getCheckPromo: "/connection-pool/promo/checkPromtionTextile",
    getinvoiceLevelCheckProm: "/connection-pool/promo/invoiceLevelCheckPromtionTextile"
};

export const CREATE_CUSTOMER_URL = {
    createCustomer: "/new-sale/newsale/savecustomerdetails",
    posClose: "/new-sale/newsale/daycloser",
};
export const GENERATE_RETURN_SLIPS_URL = {
    getInvoiceDetails: "/customer/customer/getInvoiceDetails",
    getMobileData: "/user-management/user/customer/mobileNo",
    saveCustomer: "/new-sale/newsale/savecustomerdetails",
    generateReturnSlip: "/customer/customer/createReturnSlip",
    // generateReturnSlip: "/new-sale/return_slip/createReturnSlip",
    getListOfReturnslips: "customer/getListOfReturnSlips"
};

export const INVENTORY_URLS = {
    updateInventory: "/inventory/inventoryRetail/updateInventory",
    getAllInventoriesList: "/inventory/inventoryRetail/getAllProducts",
    getAllUOMs: "/inventory/uom/list",
    updateBarcodes: "/inventory/inventoryRetail/updateBarcode",
    addBarcodes: "/inventory/inventoryRetail/createBarcode",
    getAllBarcodesList: "/inventory/inventoryRetail/getAllBarcodes",
    getRetailBarcodeDetails: "/inventory/inventoryRetail/getBarcodeId",
    updateBarcodesQuntity: "/inventory/inventory-management/product-qty",
    deleteRetailBarcode: "/inventory/inventoryRetail/deleteBarcode",
    savebulkRetail: "/inventory/inventoryRetail/saveProductList",
    getHeadersData: "/inventory/inventory-management/properties",

    // Textile

    updatTextileBarcodes: "/inventory/inventory-management/product",
    addTextileBarcodes: "/inventory/inventory-management/product",
    getTextileBarcodeDetails: "/inventory/inventory-management//barcode",
    deleteTextileBarcode: "/inventory/inventory-management/product",
    getAllBarcodesListTextile: "/inventory/inventory-management/barcodes/filter",
    getAllDivisions: "/inventory/catalog/divisions",
    getAllSections: "/inventory/catalog/category",
    getAllCategories: "/inventory/catalog/categories",
    getAllHsnList: "/hsn-details/hsn-details/getHsnDetails",
    // getAllHsnList: "/hsn-details/hsn-details/getHsnDetails",
    //  getAllHsnData:"hsn-details/hsn-details/getAllHsnDetails",
    getStoreNamesByIds: '/user-management/store/storeList',
    getReBarcodeTextileBarcodeDetails: '/inventory/inventory-management/adjustments/filter',
    getEmpNameByEmpId: "/user-management/user/getUser",
    savebulkTextile: "/inventory/inventoryTextile/saveProductTextileList",
    addBulkTextile: "/inventory/inventory-management/add-bulk-products",
    addProductBundle: "/inventory/productBundle/add",
    getAllProductBundleList: "/inventory/productBundle/all",
    addProductBundleUpdate: "/inventory/productBundle/update"

};




export const TAG_CUSTOMER_TO_GV_URL = {

    getMobileData: "/new-sale/newsale/getcustomerdetailsbymobilenuber",

    getGvNumberData: "/new-sale/newsale/getGv",

    createTagCustomerToGv: "/new-sale/newsale/tagCustomerToGv"
};


export const PROMO_ITEM_EXCHANGE_URL = {
    getRTSlips: "/promo-exchange/promoItemExchange/getlistofreturnslips",
    getMobileData: "/promo-exchange/promoItemExchange/getcustomerdetailsbymobilenumber",
    getDsNumber: "/promo-exchange/promoItemExchange/getdeliveryslip",
    savePromo: "/promo-exchange/promoItemExchange/itemExchange"
};
export const TAG_CUSTOMER_URL = {
    getGiftData: "/new-sale/newsale/getGv",
    tagCustomer: "/new-sale/newsale/tagCustomerToGv"

};

export const DELIVERYSLIPS_LIST_URL = {
    deliveryslipsList: "/new-sale/newsale/getsalereport",
    getStoresClientDomainId: "/user-management/store/getClientDomianStores"

};



export const ESTIMATIONSLIP_LIST_URL = {
    estimationslipsList: "/new-sale/newsale/getlistofdeliveryslips",
};


export const RETURNSLIPS_LIST_URL = {
    returnslipsList: "/new-sale/return_slip/getListOfReturnSlips",
    returnslipDetials: "/customer/customer/getReturnSlipsDetails",
};


export const NEWSALE_REPORT_URL = {
    listOfSaleBills: "/new-sale/newsale/getlistofsalebills"
};

export const REPORTS_GRAPHS = {
    invoicesGenerated: "/new-sale/reports/InvoicesGenerated",
    topFiveSales: "/new-sale/reports/getTopfiveSalesByStore",
    activeIactivePromos: "/connection-pool/promo/activeVSinactivepromos",
    saleSummary: "/new-sale/reports/getsaleSummery"
};


export const BARCODE_LIST_URL = {
    // listOfBarcodes: "/inventory/inventoryTextile/getAllBarcodeTextiles",
    listOfBarcodes: "/inventory/inventory-management/getBarcodeTextileReports",
    updateBarcode: "/inventory/inventory-management/product",
    getStoresClientDomainId: "/user-management/store/getClientDomianStores"

};

export const PROMOTIONS_LIST_URL = {
    // promotionsList:"/promo/promo/listOfPromotionsBySearch",
    promotionsList: "/connection-pool/promo/listOfPromotionsBySearch",
    getStoresClientDomainId: "/user-management/store/getClientDomianStores"
};



export const USER_MANAGEMENT_URL = {
    // getAllUsers: "/auth/getallUsers",
    createUser: "",
    getMasterDomains: "/user-management/client/getMasterDomains",
    getDomains: "/user-management/client/getDomiansForClient",
    saveDomain: "/user-management/client/assignDomianToClient",
    saveStore: "/user-management/store/create-store",
    getAllPrivileges: "/user-management/roles/getAllPrivilages",
    getAllStores: "/user-management/store/client/stores",
    getAllRoles: "/user-management/roles/client",
    getStoresByDomainId: "/user-management/store/getClientDomianStores",
    getRolesByDomainId: "/user-management/roles/getRolesForDomian",
    saveUser: "/user-management/auth/create-user",
    saveRole: "/user-management/roles/create-role",
    getStates: "/user-management/store/allStates",
    getDistricts: "/user-management/store/getDistrict",
    getAllUsers: "/user-management/user/users",
    getPrivilegesByName: "/user-management/roles/privilagesByName",
    getSubPrivilege: "/user-management/roles/subPrivilages",
    getSubPrivilegebyRoleId: "/user-management/roles/getPrivilages",
    getDomainName: "/user-management/client/domian",
    getPrivileges: "/user-management/roles/privileges",
    getStoresBySearch: "/user-management/store/getStoresWithFilter",
    getRolesBySearch: "/user-management/roles/rolesWithFilter",
    editStore: "/user-management/store/store",
    editRole: "/user-management/roles/updateRole",
    editUser: "/user-management/user/updateUser",
    getUserBySearch: "/user-management/user/getUser",
    getGSTNumber: "/user-management/store/getgstDetails",
    getusersByRole: "/user-management/reports/usersByRole",
    getActiveUsers: "/user-management/reports/activeVsInactiveUsers",
    getStoresVsEmployee: "/user-management/reports/storesVsEmployees",
    deleteStore: "/user-management/store/deleteStore",
    deleteUser: "/user-management/user/deleteUser"

};

export const PROMOTIONS_URL = {
    getPoolList: "/connection-pool/pool/getpoollist",
    addPool: "/connection-pool/pool/createpool",
    deletePool: "/connection-pool/pool/deletepool",
    modifyPool: "/connection-pool/pool/modifypool",
    searchPool: "/connection-pool/pool/poolSearching",
    getPromoList: "/connection-pool/promo/getpromolist",
    deletePromo: "/connection-pool/promo/deletepromo",
    searchPromotion: "/connection-pool/promo/storeLevelPromotionsSearching",
    addPromo: "/connection-pool/promo/addpromo",
    updatePromotion: "/connection-pool/promo/editpromo",
    addPromoToStore: "/connection-pool/promo/addPromoToStore",
    updatePromotionDates: "/connection-pool/promo/updatePromotionDates",
    clonePromotionByStore: "/connection-pool/promo/clonePromotionByStore",
    updatePriority: "/connection-pool/promo/updatePriority",
    getInvoiceDetails: "/new-sale/newsale/getinvoicedata",
    saveLoyaltyPoints: "/new-sale/newsale/saveLoyaltyPoints",
    getAllLoyaltyPoints: "/new-sale/newsale/getAllLoyaltyPoints",
    searchLoyaltyPoints: "/new-sale/newsale/searchLoyaltyPoints",
    addBenfit: "/connection-pool/promo/addbenfit",
    // getValuesFromProductTextileColumns: "/inventory/inventory-management/getValuesFromProductTextileColumns",
    getValuesFromProductTextileColumns: "/inventory/inventory-management/getValuesFromColumns",
    // getValuesFromBarcodeTextileColumns: "/inventory/inventoryTextile/getValuesFromBarcodeTextileColumns",
    getAllColumns: "/connection-pool/promo/allcolumnnames",
    getAllStorePromos: "/connection-pool/promo/getAllStorePromos",
    promotionsSearching: "/connection-pool/promo/promotionsSearching",
    anyMatchingData: "/connection-pool/promo/anyMatchingData",
    updatePromoStatus: "/connection-pool/promo/updatePromoStatus"
};

export const ACCOUNTING_PORTAL = {
    // saveCredit: "/hsn-details/credit-debit-notes/saveCreditDebitNotes",
    saveCredit: "/hsn-details/accounting/save",
    saveDebit: "/hsn-details/accounting/sale",
    // getCreditNotes: "/hsn-details/credit-debit-notes/getAllCreditNotes",
    getCreditNotes: "/hsn-details/accounting",
    getDebitNotes: "/hsn-details/accounting",
    getAllLedgerLogs: "/hsn-details/accounting/ledger-logs",
    payconfirmation: "/hsn-details/accounting/payconfirmation",
    saveMasterTax: "/hsn-details/tax/addnewtax",
    updatetax: "/hsn-details/tax/updatetax",
    deleteTax: "/hsn-details/tax/deleteTax",
    getAllTaxes: "/hsn-details/tax/getTaxDetails",
    getAllHsnCodesData: "/hsn-details/hsn-details/getHsnDetails",
    getDescritionData: "/hsn-details/hsn-details/getEnums/description",
    getTaxAppliesOnData: "/hsn-details/hsn-details/getEnums/taxAppliesOn",
    // saveHsnCode:"/hsn-details/hsnDetails/saveHsn",
    saveHsnCode: "/hsn-details/hsn-details/save",
    deleteHsn: "/hsn-details/hsn-details/deleteHsn",
    updateHsn: "/hsn-details/hsn-details/updateHsn",
    creditdebitOrder: "paymentgateway/create_creditdebit_order",
    payconfirmation: "/hsn-details/accounting/payconfirmation"
};
