import Api from "./Server";

const baseUrl = import.meta.env.VITE_LOCAL_URL;
const endPoint = "/v1/staff/";

export default {
    getAll(params){
        return Api(baseUrl).get(`${endPoint}?limit=${params.limit}&page=${params.page}&search=${params.search}`)
    }
}