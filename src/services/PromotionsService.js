import axios from 'axios';
import { PROMOTIONS_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class PromotionsService {
 
getPoolList(){
    // const param = `?isActive=All&domainId=${domainId}`;
    const param = '?isActive=All';
    return axios.get(BASE_URL+PROMOTIONS_URL.getPoolList+param);
}

addPool(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.addPool, obj);
}
deletePool(id) {
    const param = `?poolId=${id}`;
    return axios.delete(BASE_URL+PROMOTIONS_URL.deletePool+param);
}
modifyPool(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.modifyPool, obj);
}

searchPool(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.searchPool, obj);
}
getPromoList() {
    const param = '?flag=All';
    return axios.get(BASE_URL+PROMOTIONS_URL.getPromoList+param);
}
deletePromo(id) {
    const param = `?id=${id}`;
    return axios.delete(BASE_URL+PROMOTIONS_URL.deletePromo+param);
}
searchPromotion(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.searchPromotion, obj);
}
addPromo(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.addPromo, obj);
}
updatePromotion(obj) {
    return axios.put(BASE_URL+PROMOTIONS_URL.updatePromotion, obj);
}
getInvoiceDetails(invoiceNum) {
    const param = `?orderNumber=${invoiceNum}`;
    return axios.get(BASE_URL+PROMOTIONS_URL.getInvoiceDetails+param);
}
saveLoyaltyPoints(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.saveLoyaltyPoints, obj);
}
getAllLoyaltyPoints() {
    return axios.get(BASE_URL+PROMOTIONS_URL.getAllLoyaltyPoints);
}
addPromoToStore(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.addPromoToStore, obj);
}
updatePromotionDates(obj) {
    return axios.put(BASE_URL+PROMOTIONS_URL.updatePromotionDates, obj);
}
clonePromotionByStore(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.clonePromotionByStore, obj);
}
updatePriority(obj) {
    return axios.put(BASE_URL+PROMOTIONS_URL.updatePriority, obj);
}
searchLoyaltyPoints(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.searchLoyaltyPoints, obj);
}
addBenfit(obj) {
    return axios.post(BASE_URL+PROMOTIONS_URL.addBenfit, obj);
}
getValuesFromProductTextileColumns(columnType) {
    const enumName = `?enumName=${columnType}`;
    return axios.get(BASE_URL+PROMOTIONS_URL.getValuesFromProductTextileColumns+enumName);
}
getValuesFromBarcodeTextileColumns(columnType) {
    const enumName = `?enumName=${columnType}`;
    return axios.get(BASE_URL+PROMOTIONS_URL.getValuesFromBarcodeTextileColumns+enumName);
}
getAllColumns() {
    return axios.get(BASE_URL+PROMOTIONS_URL.getAllColumns);
}
}

export default new PromotionsService()