import axios from 'axios';
import { INVENTORY_URLS } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';


class InventoryService {

    updateInventoryList(list) {
        return axios.put(BASE_URL + INVENTORY_URLS.updateInventory, list);
    }

    getAllInventories(list) {
        return axios.post(BASE_URL + INVENTORY_URLS.getAllInventoriesList, list);
    }

    getUOMs() {
        return axios.get(BASE_URL + INVENTORY_URLS.getAllUOMs);
    }

    getAllDivisions(domainType) {
        const param  = '?domainType='+ domainType
        return axios.get(BASE_URL + INVENTORY_URLS.getAllDivisions + param);
    }

    getAllHsnList() {
        return axios.get(BASE_URL + INVENTORY_URLS.getAllHsnList);
    }
    // getAllHsnData(hsnCode){

    //     console.log("??/?",BASE_URL+INVENTORY_URLS.getAllHsnData+"?hsnCode="+hsnCode);
    //     return axios.get(BASE_URL+INVENTORY_URLS.getAllHsnData+"?hsnCode="+hsnCode);
    // }
    getAllSections(id) {
        const param1 = '?id=' + id;
        return axios.get(BASE_URL + INVENTORY_URLS.getAllSections + param1);
    }

    getAllCategories() {
        return axios.get(BASE_URL + INVENTORY_URLS.getAllCategories);
    }

    getStoreNamesByIds(list) {
        return axios.post(BASE_URL + INVENTORY_URLS.getStoreNamesByIds, list);
    }

    getEmpNamesByIds(list) {
        return axios.post(BASE_URL + INVENTORY_URLS.getEmpNameByEmpId, list);
    }



    addBarcode(list, domain, isEdit) {
        if (domain && domain.label === "Retail") {
            if (isEdit) {
                return axios.put(BASE_URL + INVENTORY_URLS.updateBarcodes, list);
            } else {
                return axios.post(BASE_URL + INVENTORY_URLS.addBarcodes, list);
            }
        } else {
            if (isEdit) {
                return axios.put(BASE_URL + INVENTORY_URLS.updatTextileBarcodes, list);
            } else {
                return axios.post(BASE_URL + INVENTORY_URLS.addTextileBarcodes, list);
            }
        }
    }

    getBarcodeDetails(barcodeId, domain, storesId) {
        if (domain && domain.label === "Retail") {
            const param1 = '?barcodeId=' + barcodeId + '&storeId=' + storesId;
            return axios.get(BASE_URL + INVENTORY_URLS.getRetailBarcodeDetails + param1);
        } else {
            const param2 = '?barcode=' + barcodeId + '&storeId=' + storesId;
            return axios.get(BASE_URL + INVENTORY_URLS.getTextileBarcodeDetails + param2);
        }
    }

    deleteBarcode(barcode, domain, barcodeId, id) {
        if (domain && domain.label === "Retail") {
            const param1 = '?barcodeId=' + barcodeId;
            return axios.delete(BASE_URL + INVENTORY_URLS.deleteRetailBarcode + param1);
        } else {
            const param2 = '?id=' + barcode;
            console.log("barcode", barcode);
            return axios.delete(BASE_URL + INVENTORY_URLS.deleteTextileBarcode + param2);
        }
    }
    getHeadersData(domain) {
        const param1 = '?domainType=' + domain;
        return axios.get(BASE_URL + INVENTORY_URLS.getHeadersData + param1);
    }

    getAllBarcodes(list, domain, pageNumber = 0) {
        const param2 = '?page=' + pageNumber;
        // if (domain && domain.label === "Retail") {
        // return axios.post(BASE_URL+INVENTORY_URLS.getAllBarcodesList,list);
        // }else{

        // return axios.post(BASE_URL+INVENTORY_URLS.getAllBarcodesListTextile + param2 +'&size=10',list);
        return axios.post(BASE_URL + INVENTORY_URLS.getAllBarcodesListTextile + param2 + '&size=10', list);
        // return axios.post(BASE_URL+INVENTORY_URLS.getAllBarcodesListTextile,list);
        // }
    }

    getReBarcodeDetails(list, domain, pageNumber = 0) {
        const param2 = '?page=' + pageNumber;
        if (domain && domain.label === "Retail") {
            return axios.post(BASE_URL + INVENTORY_URLS.getAllBarcodesList, list);
        } else {
            return axios.post(BASE_URL + INVENTORY_URLS.getReBarcodeTextileBarcodeDetails + param2 + '&size=10', list);
        }
    }
    addProductDundle(obj) {
        return axios.post(BASE_URL + INVENTORY_URLS.addProductBundle, obj);
    }
    getProductBundle(toDate, fromDate, storeId) {
        const path = `?`
        return axios.post(BASE_URL + INVENTORY_URLS.getProductBundle);
    }
    getAllProductBundleList(fromdate, todate, storeId) {
        let param = '';
        if (storeId && !fromdate && !todate) {
            param = '?storeId=' + storeId;
        } else if (storeId && fromdate && !todate) {
            param = `?storeId=${storeId}&fromDate=${fromdate ? fromdate : null}`;
        } else {
            param = `?storeId=${storeId}&fromDate=${fromdate ? fromdate : null}&toDate=${todate ? todate : null}`;
        }
        return axios.post(BASE_URL + INVENTORY_URLS.getAllProductBundleList + param);
    }
    saveBulkData(uploadFile, storeId) {
         const param2 ='?storeId='+ storeId;
        let token = JSON.parse(sessionStorage.getItem('token'));
        let formData = new FormData();
        formData.append('file', uploadFile)
        //     addBulkTextile   BASE_URL+INVENTORY_URLS.addBulkTextile     "storeId":store
        //   let commonUrl = "http://10.80.1.39:9097/inventory/inventoryTextile/add-bulk-products"
        const uninterceptedAxiosInstance = axios.create();
        return uninterceptedAxiosInstance.post(BASE_URL + INVENTORY_URLS.addBulkTextile +param2, formData,
            {
                headers: {
                    "Authorization": 'Bearer' + ' ' + token,
                  
                },
            })

    }

    // saveCustomer(list) {
    //     return axios.post(BASE_URL+GENERATE_RETURN_SLIPS_URL.saveCustomer, list);
    // }
    // generateReturnSlip(list) {
    //     return axios.post(BASE_URL+GENERATE_RETURN_SLIPS_URL.generateReturnSlip, list);
    // }

    // getListOfReturnslips(list) {
    //     return axios.get(BASE_URL+GENERATE_RETURN_SLIPS_URL.getListOfReturnslips, list);
    // }

}

export default new InventoryService()