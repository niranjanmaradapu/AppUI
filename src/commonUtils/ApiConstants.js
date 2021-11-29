export const LOGIN_URL = {
    getStores: "/user-store/stores/getstores",
    getToken: "/user-management/auth/loginWithTempPass",
    saveData: "/createData",
    registerUser: "/user-management/client/createClient",
    changePassword:"/user-management/auth/authResponce"
}
export const CREATE_DELIVERY_SLIP_URL = {
    getDeliverySlip: "/inventory/inventoryTextile/getBarcodeTextile",
    createDeliverySlip: "/new-sale/newsale/createdeliveryslip",
    getLineItems: "/new-sale/newsale/savelineitems",
    saveDelivery: "/new-sale/newsale/createdeliveryslip"
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

export const INVENTORY_URLS = {
    updateInventory: "/inventory/inventoryRetail/updateInventory",
    getAllInventoriesList: "/inventory/inventoryRetail/getAllProducts", 
    getAllUOMs: "/inventory/uom/getAllUom",
    updateBarcodes: "/inventory/inventoryRetail/updateBarcode",
    addBarcodes: "/inventory/inventoryRetail/createBarcode",
    getAllBarcodesList: "/inventory/inventoryRetail/getAllBarcodes",
    getRetailBarcodeDetails : "/inventory/inventoryRetail/getBarcodeId",
    deleteRetailBarcode: "/inventory/inventoryRetail/deleteBarcode",

    // Textile

    updatTextileBarcodes: "/inventory/inventoryTextile/updateBarcode_Textile",
    addTextileBarcodes: "/inventory/inventoryTextile/addBarcode_Textile",
    getTextileBarcodeDetails : "/inventory/inventoryTextile/getBarcodeTextile",
    deleteTextileBarcode: "/inventory/inventoryTextile/deleteBarcode_Textile",
    getAllBarcodesListTextile: "/inventory/inventoryTextile/getAllBarcodeTextiles",
    getAllDivisions: "/catalog-categories/catalog/ListOfDivisions",
    getAllSections: "/catalog-categories/catalog/getcategoriesByid",
    getAllCategories: "/catalog-categories/catalog/ListOfAllCategories",
    getAllHsnList:"/hsn-details/hsnDetails/getHsnDetails",
    getStoreNamesByIds: '/user-management/store/storeList'
    
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

export const  DELIVERYSLIPS_LIST_URL = {
    deliveryslipsList: "/new-sale/newsale/getsalereport",
    getStoresClientDomainId:"/user-management/store/getClientDomianStores"

}



export const  RETURNSLIPS_LIST_URL = {
    returnslipsList: "/customer/customer/getListOfReturnSlips",
    returnslipDetials:"/customer/customer/getReturnSlipsDetails",
    
   
}


export const NEWSALE_REPORT_URL={
    listOfSaleBills:"/new-sale/newsale/getlistofsalebills"
}


export const BARCODE_LIST_URL={
    listOfBarcodes:"/inventory/inventoryTextile/getAllBarcodeTextiles",
    updateBarcode:"/inventory/inventoryTextile/updateBarcode_Textile",
    getStoresClientDomainId:"/user-management/store/getClientDomianStores"

}

export const PROMOTIONS_LIST_URL={
    // promotionsList:"/promo/promo/listOfPromotionsBySearch",
    promotionsList:"/connection-pool/promo/listOfPromotionsBySearch",
    getStoresClientDomainId:"/user-management/store/getClientDomianStores"
}




export const USER_MANAGEMENT_URL = {
    getAllUsers: "/auth/getallUsers",
    createUser: "",
    getMasterDomains: "/user-management/client/getMasterDomains",
    getDomains: "/user-management/client/getDomiansForClient",
    saveDomain:"/user-management/client/assignDomianToClient",
    saveStore: "/user-management/store/createStore",
    getAllPrivileges: "/user-management/roles/getAllPrivilages",
    getAllStores: "/user-management/store/getClientStores",
    getAllRoles:"/user-management/roles/getRolesForClient",
    getStoresByDomainId: "/user-management/store/getClientDomianStores",
    getRolesByDomainId:"/user-management/roles//getRolesForDomian",
    saveUser: "/user-management/auth/createUser",
    saveRole: "/user-management/roles/createRole",
    getStates: "/user-management/store/allStates",
    getDistricts: "/user-management/store/getDistrict",
    getAllUsers: "/user-management/user/getallUsers",
    getPrivilegesByName: "/user-management/roles/privilagesByName",
    getSubPrivilege: "/user-management/roles/subPrivilages",
    getDomainName: "/user-management/client/domian",
    getPrivilegesByDomain: "/user-management/roles/privillagesForDomian",
    getStoresBySearch: "/user-management/store/getStoresWithFilter",
    getRolesBySearch: "/user-management/roles/rolesWithFilter",
    editStore: "/user-management/store/store",
    editRole: "/user-management/roles/updateRole",
    editUser: "/user-management/user/updateUser",
    getUserBySearch:"/user-management/user/getUser"
}
