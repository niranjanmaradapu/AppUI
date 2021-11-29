import axios from "axios";
import{BARCODE_LIST_URL} from "../../commonUtils/ApiConstants";
import {BASE_URL} from "../../commonUtils/Base";


class ListOfBarcodesService{
    getBarcodes(data){
        return axios.post(BASE_URL+BARCODE_LIST_URL.listOfBarcodes,data);

    }

updateBarcodes(barcodeTextileId){
    return axios.put(BASE_URL+BARCODE_LIST_URL.updateBarcode,barcodeTextileId);
}

getStoreNames(domainId){
    return axios.get(BASE_URL+BARCODE_LIST_URL.getStoresClientDomainId+ '?clientDomianId=' + domainId)
}


}

export default new ListOfBarcodesService()