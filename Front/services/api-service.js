import axios from "axios";

const baseUrl = "http://192.168.1.34:3000/";

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

    UpdateUserProfile(userName, password, userId){
      const endPoint = "profile/update";
      return this._axios.post(`${this.baseUrl}${endPoint}`, {
        userName,
        password,
        userId
      });
    }


    // AUTH
    RegisterUser(userName, password) {
      const endPoint = "auth/register";
      return this._axios.post(`${this.baseUrl}${endPoint}`, {
        userName,
        password,
      });
    }

    LoginUser(userName, password) {
      console.log("api-service-login");
      const endPoint = "auth/login";
      return this._axios.post(`${this.baseUrl}${endPoint}`, {
        userName,
        password,
      });
    }

    //HOME_PAGE
    SavePost(userId, text){
      const endPoint = "home-page/save-post";
      return this._axios.post(`${this.baseUrl}${endPoint}`, {
        userId,
        text,
      });
    }
  }
  return new ApiService();
})();

export default ApiService;
