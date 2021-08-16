import axios from 'axios';
import { LOGIN_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class LoginService {
    getAuth(){
        return axios.get(BASE_URL+LOGIN_URL.getToken,null);
    }
    saveData(){
        return axios.post(BASE_URL+LOGIN_URL.saveData,null);
    }
}
export default new LoginService()