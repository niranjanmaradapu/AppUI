import axios from "axios";
import { MAIN_DASHBOARD } from "../commonUtils/ApiConstants";
import { BASE_URL } from "../commonUtils/Base";

class MainDashboardService {
    getTodaySale(storeId, domainId) {
        const param = '?storeId=' + storeId + '&domainId=' + domainId;
        return axios.get(BASE_URL + MAIN_DASHBOARD.getTodaysSale + param);
    }

    getMonthlySale(storeId, domainId) {
        const param = '?storeId=' + storeId + '&domainId=' + domainId;
        return axios.get(BASE_URL + MAIN_DASHBOARD.getMonthlySale + param);
    }

    getLastVsThisMonthSale(storeId, domainId) {
        const param = '?storeId=' + storeId + '&domainId=' + domainId;
        return axios.get(BASE_URL + MAIN_DASHBOARD.getLastVsThisMonthSale + param);
    }

    getTopFiveSalesRepresentatives(storeId, domainId) {
        const param = '?storeId=' + storeId + '&domainId=' + domainId;
        return axios.get(BASE_URL + MAIN_DASHBOARD.getTopFiveSalesRepresentative + param);
    }

    getSalesByCategory(storeId, domainId) {
        const param = '?storeId=' + storeId + '&domainId=' + domainId;
        return axios.get(BASE_URL + MAIN_DASHBOARD.getSalesByCategory + param);
    }

}

export default new MainDashboardService();