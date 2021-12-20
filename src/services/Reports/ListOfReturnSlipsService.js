import axios from "axios";
import { RETURNSLIPS_LIST_URL } from "../../commonUtils/ApiConstants";
import { BASE_URL } from "../../commonUtils/Base";

class ListOfReturnSlipsService{
    getReturnSlips(returnSlip){
        return axios.post(BASE_URL+RETURNSLIPS_LIST_URL.returnslipsList,returnSlip);
    }

    getReturnslipDetails(rtNumber){
        return axios.get(BASE_URL+RETURNSLIPS_LIST_URL.returnslipDetials + '?rtNumber=' + rtNumber)
    }
}


export default new ListOfReturnSlipsService()