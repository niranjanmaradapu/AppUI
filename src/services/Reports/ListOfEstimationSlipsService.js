import axios from "axios";
import {ESTIMATIONSLIP_LIST_URL} from '../../commonUtils/ApiConstants';
import { BASE_URL } from "../../commonUtils/Base";

class ListOfEstimationSlipsService{
    getEstimationSlips(data){
        return axios.post(BASE_URL+ESTIMATIONSLIP_LIST_URL.estimationslipsList,data);
    }
}


export default new ListOfEstimationSlipsService()