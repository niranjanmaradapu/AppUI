import axios from 'axios';
import { USER_MANAGEMENT_URL } from '../../commonUtils/ApiConstants';
import { BASE_URL } from '../../commonUtils/Base';


class URMService {

    getDomainsList(clientId) {
        const param = '/'+ clientId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getDomains+param);
    }

    getMasterDomainsList() {
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getMasterDomains);
    }

    saveDomains(saveObj) {
        return axios.post(BASE_URL+USER_MANAGEMENT_URL.saveDomain, saveObj);
    }

    saveStore(saveObj) {
        return axios.post(BASE_URL+USER_MANAGEMENT_URL.saveStore, saveObj);
    }

    editStore(saveObj) {
        return axios.put(BASE_URL+USER_MANAGEMENT_URL.editStore, saveObj);
    }

   



    getAllPrivileges() {
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getAllPrivileges);
    }
   
    getAllStores(clientId) {
        const param = '?clientId='+ clientId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getAllStores+param);
    }

    getAllRoles(clientId) {
        const param = '/'+ clientId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getAllRoles+param);
    }

    getStoresByDomainId(domainId) {
        const param = '?clientDomianId='+ domainId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getStoresByDomainId+param);
    }

    getRolesByDomainId(domainId) {
        const param = '/'+ domainId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getRolesByDomainId+param);
    }

    saveUser(saveObj) {
        return axios.post(BASE_URL+USER_MANAGEMENT_URL.saveUser, saveObj);
    }

    editUser(saveObj) {
        return axios.put(BASE_URL+USER_MANAGEMENT_URL.editUser, saveObj);
    }

    saveRole(saveObj) {
        return axios.post(BASE_URL+USER_MANAGEMENT_URL.saveRole, saveObj);
    }

    editRole(saveObj) {
        return axios.put(BASE_URL+USER_MANAGEMENT_URL.editRole, saveObj);
    }

    getStates() {
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getStates);
    }

    getDistricts(stateId) {
        const param = '?stateCode='+ stateId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getDistricts+param);
    }

    getGSTDetails(stateId, clientId) {
        const param = '?clientId='+ clientId+'&stateCode='+stateId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getGSTNumber+param);
    }

    getUsers(clientId) {
        const param = '/'+ clientId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getAllUsers+param);
    }

    getSelectedPrivileges(domainName) {
        const param = '/'+ domainName; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getPrivilegesByName+param);
    }

    getSubPrivileges(parentId) {
        const param = '/'+ parentId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getSubPrivilege+param);
    }

    getSubPrivilegesbyRoleId(roleId) {
        const param = '/'+ roleId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getPrivilegesByName+param); 
    }

    getDomainName(clientDomainId) {
        const param = '/'+ clientDomainId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getDomainName+param);
    }

    getAllPrivilegesbyDomain(domainId) {
        const param = '/'+ domainId; 
        return axios.get(BASE_URL+USER_MANAGEMENT_URL.getPrivilegesByDomain+param);
    }

    getStoresBySearch(searchStore) {

        return axios.post(BASE_URL+USER_MANAGEMENT_URL.getStoresBySearch, searchStore);
    }

    getRolesBySearch(searchRole) {

        return axios.post(BASE_URL+USER_MANAGEMENT_URL.getRolesBySearch, searchRole);
    }

    getUserBySearch(searchUser) {
        return axios.post(BASE_URL+USER_MANAGEMENT_URL.getUserBySearch, searchUser);

    }

}
export default new URMService()