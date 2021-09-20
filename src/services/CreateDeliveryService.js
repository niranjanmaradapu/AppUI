import axios from 'axios';
import { CREATE_DELIVERY_SLIP_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class CreateDeliveryService {

    getBarCodeList(barCode, smNumber){
        const param = '?barCode='+ barCode + "&smId="+smNumber; 
        return axios.get(BASE_URL+CREATE_DELIVERY_SLIP_URL.getDeliverySlip+param);
    }

    createDeliverySlip(list, type) {
        const param = '?enumName='+ type;
        return axios.post(BASE_URL+CREATE_DELIVERY_SLIP_URL.createDeliverySlip+param, list);
    }

}

export default new CreateDeliveryService()