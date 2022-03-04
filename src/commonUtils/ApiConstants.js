export const LOGIN_URL = {
    getStores: "/user-store/stores/getstores",
    getToken: "/user-management/auth/loginWithTempPass",
    saveData: "/createData",
    registerUser: "/user-management/client/createClient",
    changePassword: "/user-management/auth/authResponce",
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
    getDeliverySlip: "/inventory/inventoryTextile/getBarcodeTextile",
    createDeliverySlip: "/new-sale/newsale/createdeliveryslip",
    getLineItems: "/new-sale/newsale/savelineitems",
    saveDelivery: "/new-sale/newsale/createdeliveryslip",
    getRetailBarcode: "/inventory/inventoryRetail/getBarcodeId",
    addCustomer: "/user-management/auth/createUser",
    getMobileData: "/new-sale/newsale/getcustomerdetailsbymobilenuber",

    getGvNumberData: "/new-sale/newsale/getGv",

    createTagCustomerToGv: "/new-sale/newsale/tagCustomerToGv",
    getReturnSlips: "/new-sale/newsale/getInvoiceDetails",
    saveReturnSlip: "/customer/customer/createReturnSlip",
    getCustomerMobile: "/user-management/user/customer/mobileNo",
    getGiftVochers: "/new-sale/newsale/getlistofgv",
    saveGiftVoucher: "/new-sale/newsale/saveGv",
    changeGvFlag: "/new-sale/newsale/changeflaggv"
};

export const NEW_SALE_URL = {
    getDslipData: "/new-sale/newsale/getdeliveryslip",
    getMobileData: "/new-sale/newsale/getcustomerdetailsbymobilenuber",
    getNetAmount: "/new-sale/newsale/getHsnDetails",
    getDiscountReasons: "/new-sale/newsale/discTypes",
    getCreditNotes: "/hsn-details/credit-debit-notes/getCreditNotes",
    saveSale: "/new-sale/newsale/sale",
    getCoupons: "/new-sale/newsale/getGv",
    getHsnDetails: "/hsn-details/hsnDetails/getHsnDetails",
    getCheckPromo: "/connection-pool/promo/checkPromtionTextile"
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
    getListOfReturnslips: "customer/getListOfReturnSlips"
};

export const INVENTORY_URLS = {
    updateInventory: "/inventory/inventoryRetail/updateInventory",
    getAllInventoriesList: "/inventory/inventoryRetail/getAllProducts",
    getAllUOMs: "/inventory/uom/getAllUom",
    updateBarcodes: "/inventory/inventoryRetail/updateBarcode",
    addBarcodes: "/inventory/inventoryRetail/createBarcode",
    getAllBarcodesList: "/inventory/inventoryRetail/getAllBarcodes",
    getRetailBarcodeDetails: "/inventory/inventoryRetail/getBarcodeId",
    deleteRetailBarcode: "/inventory/inventoryRetail/deleteBarcode",
    savebulkRetail: "/inventory/inventoryRetail/saveProductList",

    // Textile

    updatTextileBarcodes: "/inventory/inventoryTextile/updateBarcode_Textile",
    addTextileBarcodes: "/inventory/inventoryTextile/addBarcode_Textile",
    getTextileBarcodeDetails: "/inventory/inventoryTextile/getBarcodeTextile",
    deleteTextileBarcode: "/inventory/inventoryTextile/deleteBarcode_Textile",
    getAllBarcodesListTextile: "/inventory/inventoryTextile/getAllBarcodeTextiles",
    getAllDivisions: "/inventory/catalog/ListOfDivisions",
    getAllSections: "/inventory/catalog/getcategoriesByid",
    getAllCategories: "/inventory/catalog/ListOfAllCategories",
    getAllHsnList: "/hsn-details/hsnDetails/getHsnDetails",
    getStoreNamesByIds: '/user-management/store/storeList',
    getReBarcodeTextileBarcodeDetails: '/inventory/inventoryTextile/getAllAdjustments',
    getEmpNameByEmpId: "/user-management/user/getUser",
    savebulkTextile: "/inventory/inventoryTextile/saveProductTextileList"

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
    estimationslipsList: "/new-sale/newsale/getlistofdeliveryslips"
};


export const RETURNSLIPS_LIST_URL = {
    returnslipsList: "/customer/customer/getListOfReturnSlips",
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
    listOfBarcodes: "/inventory/inventoryTextile/getBarcodeTextileReports",
    updateBarcode: "/inventory/inventoryTextile/updateBarcode_Textile",
    getStoresClientDomainId: "/user-management/store/getClientDomianStores"

};

export const PROMOTIONS_LIST_URL = {
    // promotionsList:"/promo/promo/listOfPromotionsBySearch",
    promotionsList: "/connection-pool/promo/listOfPromotionsBySearch",
    getStoresClientDomainId: "/user-management/store/getClientDomianStores"
};



export const USER_MANAGEMENT_URL = {
    getAllUsers: "/auth/getallUsers",
    createUser: "",
    getMasterDomains: "/user-management/client/getMasterDomains",
    getDomains: "/user-management/client/getDomiansForClient",
    saveDomain: "/user-management/client/assignDomianToClient",
    saveStore: "/user-management/store/createStore",
    getAllPrivileges: "/user-management/roles/getAllPrivilages",
    getAllStores: "/user-management/store/getClientStores",
    getAllRoles: "/user-management/roles/getRolesForClient",
    getStoresByDomainId: "/user-management/store/getClientDomianStores",
    getRolesByDomainId: "/user-management/roles//getRolesForDomian",
    saveUser: "/user-management/auth/createUser",
    saveRole: "/user-management/roles/createRole",
    getStates: "/user-management/store/allStates",
    getDistricts: "/user-management/store/getDistrict",
    getAllUsers: "/user-management/user/getallUsers",
    getPrivilegesByName: "/user-management/roles/privilagesByName",
    getSubPrivilege: "/user-management/roles/subPrivilages",
    getSubPrivilegebyRoleId: "/user-management/roles/getPrivilages",
    getDomainName: "/user-management/client/domian",
    getPrivilegesByDomain: "/user-management/roles/privillagesForDomian",
    getStoresBySearch: "/user-management/store/getStoresWithFilter",
    getRolesBySearch: "/user-management/roles/rolesWithFilter",
    editStore: "/user-management/store/store",
    editRole: "/user-management/roles/updateRole",
    editUser: "/user-management/user/updateUser",
    getUserBySearch: "/user-management/user/getUser",
    getGSTNumber: "/user-management/store/getgstDetails",
    getusersByRole: "/user-management/reports/usersByRole",
    getActiveUsers: "/user-management/reports/activeVsInactiveUsers",
    getStoresVsEmployee: "/user-management/reports/storesVsEmployees"

};

export const PROMOTIONS_URL = {
    getPoolList: "/connection-pool/pool/getpoollist",
    addPool: "/connection-pool/pool/createpool",
    deletePool: "/connection-pool/pool/deletepool",
    modifyPool: "/connection-pool/pool/modifypool",
    searchPool: "/connection-pool/pool/poolSearching",
    getPromoList: "/connection-pool/promo/getpromolist",
    deletePromo: "/connection-pool/promo/deletepromo",
    searchPromotion: "/connection-pool/promo/searchPromotion",
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
    getValuesFromProductTextileColumns: "/inventory/inventoryTextile/getValuesFromProductTextileColumns",
    getValuesFromBarcodeTextileColumns: "/inventory/inventoryTextile/getValuesFromBarcodeTextileColumns",
    getAllColumns: "/inventory/inventoryTextile/getAllColumns"
};

export const ACCOUNTING_PORTAL = {
    saveCredit: "/hsn-details/credit-debit-notes/saveCreditDebitNotes",
    getCreditNotes: "/hsn-details/credit-debit-notes/getAllCreditNotes",
    getDebitNotes: "/hsn-details/credit-debit-notes/getAllDebitNotes",
    saveMasterTax:"/hsn-details/tax/addnewtax",
    getAllTaxes:"/hsn-details/tax/getTaxDetails",
    getAllHsnCodesData:"/hsn-details//hsnDetails/getHsnDetails",
    getDescritionData:"/hsn-details/hsnDetails/getEnums/description",
    getTaxAppliesOnData:"/hsn-details/hsnDetails/getEnums/taxAppliesOn",
    saveHsnCode:"/hsn-details/hsnDetails/saveHsn",

};
