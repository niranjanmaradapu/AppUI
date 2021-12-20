import axios from 'axios';
import {NEWSALE_REPORT_URL} from "../../commonUtils/ApiConstants";

import { BASE_URL } from '../../commonUtils/Base';

class ListOfSaleBillsService{
    getSaleBills(data){
        return axios.post(BASE_URL+NEWSALE_REPORT_URL.listOfSaleBills,data);

    }
}
export default new ListOfSaleBillsService()