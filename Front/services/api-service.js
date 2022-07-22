import axios from "axios";

const baseUrl = "http://192.168.1.37:3000/";

const ApiService = (() => {
  class ApiService {
    constructor() {
      this.baseUrl = baseUrl;
      this._axios = axios;
    }

    GetDefaultPage() {
      return this._axios.get(this.baseUrl);
    }

    // PROFILE
    GetUserData(userId){
      const endPoint = "profile/metaData";
      return this._axios.post(`${this.baseUrl}${endPoint}`,{
        userId
      });
    }

    UpdateUserProfile(email, password, userId){
      const endPoint = "profile/update";
      return this._axios.post(`${this.baseUrl}${endPoint}`, {
        email,
        password,
        userId
      });
    }


    // AUTH
    RegisterUser(email, password) {
      const endPoint = "auth/register";
      return this._axios.post(`${this.baseUrl}${endPoint}`, {
        email,
        password,
      });
    }

    LoginUser(email, password) {
      console.log("api-service-login");
      const endPoint = "auth/login";
      return this._axios.post(`${this.baseUrl}${endPoint}`, {
        email,
        password,
      });
    }
  }
  return new ApiService();
})();

export default ApiService;
