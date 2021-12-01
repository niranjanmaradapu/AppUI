import axios from 'axios';
import { INVENTORY_URLS } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';


class InventoryService {

    updateInventoryList(list){
        return axios.put(BASE_URL+INVENTORY_URLS.updateInventory,list);
    }

    getAllInventories(list){
        return axios.post(BASE_URL+INVENTORY_URLS.getAllInventoriesList,list);
    }

    getUOMs() {
        return axios.get(BASE_URL+INVENTORY_URLS.getAllUOMs);
    }

    getAllDivisions() {
        return axios.get(BASE_URL+INVENTORY_URLS.getAllDivisions);
    }

    getAllHsnList() {
        return axios.get(BASE_URL + INVENTORY_URLS.getAllHsnList);
    }

    getAllSections(id) {
        const param1 = '?id='+ id;
        return axios.get(BASE_URL+INVENTORY_URLS.getAllSections + param1);
    }

    getAllCategories() {
        return axios.get(BASE_URL+INVENTORY_URLS.getAllCategories);
    }

    getStoreNamesByIds(list){
        return axios.post(BASE_URL+INVENTORY_URLS.getStoreNamesByIds,list);
    }
    
    

    addBarcode(list, domain, isEdit) {
        if (domain  && domain.label === "Retail") {
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
  
    getBarcodeDetails(barcodeId,domain) { 
        if (domain  && domain.label === "Retail") {
            const param1 = '?barcodeId='+ barcodeId;
            return axios.get(BASE_URL + INVENTORY_URLS.getRetailBarcodeDetails + param1);
        } else {
            const param2 = '?barcode='+ barcodeId;
            return axios.get(BASE_URL + INVENTORY_URLS.getTextileBarcodeDetails + param2);
        }
    }

    deleteBarcode(barcodeId,domain) {
        if (domain && domain.label === "Retail") {
            const param1 = '?barcodeId=' + barcodeId;
            return axios.delete(BASE_URL + INVENTORY_URLS.deleteRetailBarcode + param1);
        } else {
            const param2 = '?barcodeTextileId=' + barcodeId;
            return axios.delete(BASE_URL + INVENTORY_URLS.deleteTextileBarcode + param2);
        }
    }


    getAllBarcodes(list,domain){
        if (domain && domain.label === "Retail") {
        return axios.post(BASE_URL+INVENTORY_URLS.getAllBarcodesList,list);
        }else{
            return axios.post(BASE_URL+INVENTORY_URLS.getAllBarcodesListTextile,list);
        }
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