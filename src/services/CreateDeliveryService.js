import axios from 'axios';
import { CREATE_DELIVERY_SLIP_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class CreateDeliveryService {

    getBarCodeList(barCode, smNumber,storeId) {
        const param = '?barcode=' + barCode+'&storeId='+storeId;
        return axios.get(BASE_URL + CREATE_DELIVERY_SLIP_URL.getDeliverySlip + param);
    }

    createDeliverySlip(list, type) {
        const param = '?enumName=' + type;
        return axios.post(BASE_URL + CREATE_DELIVERY_SLIP_URL.createDeliverySlip + param, list);
    }

    getLineItem(lineItem, domainId) {
        const param = '/' + domainId;
        return axios.post(BASE_URL + CREATE_DELIVERY_SLIP_URL.getLineItems + param, lineItem);
    }

    saveDelivery(createObj) {
        return axios.post(BASE_URL + CREATE_DELIVERY_SLIP_URL.saveDelivery, createObj);
    }

    getRetailBarcodeList(barCode) {
        const param = '?barcodeId=' + barCode;
        return axios.get(BASE_URL + CREATE_DELIVERY_SLIP_URL.getRetailBarcode + param);
    }

    addCustomer(addCustomerobj) {
        return axios.post(BASE_URL + CREATE_DELIVERY_SLIP_URL.addCustomer, addCustomerobj);
    }


    getMobileData(mobileNumber) {
        return axios.get(BASE_URL + CREATE_DELIVERY_SLIP_URL.getMobileData + '?mobileNumber=' + mobileNumber);
    }

    getGvNumberData(gvNumber) {
        return axios.get(BASE_URL + CREATE_DELIVERY_SLIP_URL.getGvNumberData + '?gvNumber=' + gvNumber);
    }


    createTagCustomerToGv(customerId, gvId) {
        return axios.post(BASE_URL + CREATE_DELIVERY_SLIP_URL.createTagCustomerToGv + '/' + customerId + '/' + gvId);
    }

    getReturnSlipDetails(obj) {
        return axios.post(BASE_URL + CREATE_DELIVERY_SLIP_URL.getReturnSlips, obj);
    }

    saveGenerateReturnSlip(saveobj) {
        return axios.post(BASE_URL + CREATE_DELIVERY_SLIP_URL.saveReturnSlip, saveobj);
    }

    getUserByMobile(mobileNumber) {
        const param = '/' + mobileNumber;
        return axios.get(BASE_URL + CREATE_DELIVERY_SLIP_URL.getCustomerMobile + param);
    }

    getGiftVochersList() {
        return axios.get(BASE_URL + CREATE_DELIVERY_SLIP_URL.getGiftVochers);
    }

}

export default new CreateDeliveryService()