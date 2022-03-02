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
}
export default new AccountingPortalService()