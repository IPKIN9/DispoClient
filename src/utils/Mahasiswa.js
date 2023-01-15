import Api from "./Server";
import AuthCheck from "./AuthCheck";

const baseUrl = import.meta.env.VITE_SERVICE_URL;
const endPoint = "/v1/mahasiswa";

export default {
    getAll(params){
        return Api(baseUrl).get(`${endPoint}?limit=${params.limit}&page=${params.page}&search=${params.search}`, AuthCheck.getToken())
    },

    upsert(payload){
        return Api(baseUrl).post(endPoint, payload, AuthCheck.getToken())
    },

    delete(id){
        return Api(baseUrl).delete(`${endPoint}${id}`, AuthCheck.getToken())
    }
}