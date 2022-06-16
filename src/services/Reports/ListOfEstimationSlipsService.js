import axios from "axios";
import { ESTIMATIONSLIP_LIST_URL } from '../../commonUtils/ApiConstants';
import { BASE_URL } from "../../commonUtils/Base";

class ListOfEstimationSlipsService {
    getEstimationSlips(data, pageNumber = 0) {
        const param2 = '?page=' + pageNumber;
        return axios.post(BASE_URL + ESTIMATIONSLIP_LIST_URL.estimationslipsList + param2 + '&size=10', data);
    }
}


export default new ListOfEstimationSlipsService()