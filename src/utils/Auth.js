import Api from "./Server";

const baseUrl = import.meta.env.VITE_SERVICE_URL;
const endPoint = "/v1/oauth/token";
const userUri = "/v1/scope"

export default {
  getScope(params){
    return Api(baseUrl).get(`${userUri}?username=${params}`)
  },

  getToken(payload){
    return Api(baseUrl).post(endPoint, payload)
  }
}