import Api from "./Server";

const baseUrl = import.meta.env.VITE_SERVICE_URL;
const endPoint = "/v1/ticket/";

export default {
    getAll(params){
        return Api(baseUrl).get(`${endPoint}?limit=${params.limit}&page=${params.page}&search=${params.search}`)
    },

    upsert(payload){
        return Api(baseUrl).post(endPoint, payload)
    },

    delete(id){
        return Api(baseUrl).delete(`${endPoint}${id}`)
    }
}