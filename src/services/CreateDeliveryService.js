import axios from 'axios';
import { CREATE_DELIVERY_SLIP_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class CreateDeliveryService {

    getBarCodeList(barCode, smNumber){
        const param = '?barcode='+ barCode; 
        return axios.get(BASE_URL+CREATE_DELIVERY_SLIP_URL.getDeliverySlip+param);
    }

    createDeliverySlip(list, type) {
        const param = '?enumName='+ type;
        return axios.post(BASE_URL+CREATE_DELIVERY_SLIP_URL.createDeliverySlip+param, list);
    }

    getLineItem(lineItem, domainId) {
        const param = '/'+ domainId;
        return axios.post(BASE_URL+CREATE_DELIVERY_SLIP_URL.getLineItems+param, lineItem);
    }

    saveDelivery(createObj) {
        return axios.post(BASE_URL+CREATE_DELIVERY_SLIP_URL.saveDelivery, createObj);
    }

}

export default new CreateDeliveryService()