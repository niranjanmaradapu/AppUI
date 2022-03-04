import axios from 'axios';
import { ACCOUNTING_PORTAL } from '../../commonUtils/ApiConstants';
import { BASE_URL } from '../../commonUtils/Base';

class AccountingPortalService {

    saveCredit(saveCredit) {
        return axios.post(BASE_URL+ACCOUNTING_PORTAL.saveCredit, saveCredit);
    }

    getCreditNotes(creditNotes) {
        return axios.post(BASE_URL+ACCOUNTING_PORTAL.getCreditNotes, creditNotes);
    }

    getDebitNotes(debitNotes) {
        return axios.post(BASE_URL+ACCOUNTING_PORTAL.getDebitNotes, debitNotes);
    }
    saveMasterTax(saveTax){
        return axios.post(BASE_URL+ACCOUNTING_PORTAL.saveMasterTax, saveTax);   
    }
    getAllMasterTax(){
        return axios.get(BASE_URL+ACCOUNTING_PORTAL.getAllTaxes);
    }
    getDescrition(){
        return axios.get(BASE_URL+ACCOUNTING_PORTAL.getDescritionData);
    }
    getTaxAppliesOn(){
        return axios.get(BASE_URL+ACCOUNTING_PORTAL.getTaxAppliesOnData);
    }
    getAllHsnCodes(){
        return axios.get(BASE_URL+ACCOUNTING_PORTAL.getAllHsnCodesData);
    }
    saveHsnCode(saveHsnObj){
        return axios.post(BASE_URL+ACCOUNTING_PORTAL.saveHsnCode, saveHsnObj);
    }
}
export default new AccountingPortalService()