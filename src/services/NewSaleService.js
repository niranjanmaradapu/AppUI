import axios from 'axios';
import { GENERATE_RETURN_SLIPS_URL, NEW_SALE_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class NewSaleService { 
    
    getDeliverySlipDetails(obj){
        const param = '?dsNumber='+ obj; 
        return axios.get(BASE_URL+NEW_SALE_URL.getDslipData+param);
    }

    getMobileData(mobileNumber) {
        // const param = '?mobileNumber='+ mobileNumber;
        // return axios.get(BASE_URL+NEW_SALE_URL.getMobileData+param);
        return axios.get(BASE_URL+GENERATE_RETURN_SLIPS_URL.getMobileData+'/'+mobileNumber);
    }

    getCreditNotes(mobileNumber, customerId) {
         const param = '?mobileNumber='+ mobileNumber+ '&customerId=' + customerId;
    return axios.get(BASE_URL+NEW_SALE_URL.getCreditNotes+param);
    }

    getTaxAmount(netAmount) {
        const param = '/'+ netAmount;
        return axios.get(BASE_URL+NEW_SALE_URL.getNetAmount+param);   
    }

    getDiscountReasons() {
        return axios.get(BASE_URL+NEW_SALE_URL.getDiscountReasons); 
    }

    saveSale(obj) {
        return axios.post(BASE_URL+NEW_SALE_URL.saveSale, obj);
    }

    payment(value, newsaleId){
        const URL= process.env.REACT_APP_BASE_URL+'/paymentgateway/paymentgateway/create_order'
        console.log(URL);
        const body =   JSON.stringify(  { "amount": value,
         "info": "order creations",
        "newsaleId":newsaleId}    )
        return  axios.post(URL, body, {
         headers: {
             'Content-Type': 'application/json',
         }
     });
    }

    getCoupons(clientId, couponCode) {
        const param = '/'+ clientId + '?gvNumber='+couponCode;
        return axios.get(BASE_URL+NEW_SALE_URL.getCoupons+param);
    }

    getHsnDetails() {
        return axios.get(BASE_URL+NEW_SALE_URL.getHsnDetails);
    }

    postPaymentData(paymentOrderId, status) {
        const param = '?razorPayId='+ paymentOrderId +'&payStatus'+ status; 
        return axios.post(BASE_URL+NEW_SALE_URL.saveSale+param, {});
    }

    getCheckPromoAmount(storeId, domainId, reqObj) {
        const param = '?storeId='+ storeId +'&domainId'+ domainId; 
        return axios.post(BASE_URL+NEW_SALE_URL.getCheckPromo+param, reqObj);
    }

  
} 
export default new NewSaleService()