import Api from "./Server";
import AuthCheck from "./AuthCheck";

const baseUrl = import.meta.env.VITE_SERVICE_URL;
const endPoint = "/v1/pengajuan/";

export default {
    getStatus(params){
        return Api(baseUrl).get(`${endPoint}?no_tiket=${params.no_tiket}`, AuthCheck.getToken())
    }
}