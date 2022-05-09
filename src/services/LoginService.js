import axios from 'axios';
import { LOGIN_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class LoginService {
    getStores(){
        return axios.get(BASE_URL+LOGIN_URL.getStores);
    }
    getAuth(obj){
         return axios.post(BASE_URL+LOGIN_URL.getToken,obj);
        // const headers = {
        //     'Content-Type':'application/json',
        //     'keepalive-time':330000
        // }
        // return axios.post(BASE_URL+LOGIN_URL.getToken,obj,{headers: headers});
    }
    saveData(){
        return axios.post(BASE_URL+LOGIN_URL.saveData,null);
    }

    registerUser(obj) {
        return axios.post(BASE_URL+LOGIN_URL.registerUser,obj);
    }

    changePassword(obj) {
        return axios.post(BASE_URL+LOGIN_URL.changePassword,obj);
    }

    getConfirmationCode(userName) {
        const param = '?userName='+ userName; 
        return axios.get(BASE_URL+LOGIN_URL.sendVerificationCode+param); 
    }

    changeForgotPassword(userName, confirmationCode, newForgotPassword) {
        const param = '?username='+ userName + '&confirmarionCode=' +confirmationCode+ '&newPassword=' + newForgotPassword; 
        return axios.post(BASE_URL+LOGIN_URL.forgotPassword+param, {}); 
    }
}
export default new LoginService()