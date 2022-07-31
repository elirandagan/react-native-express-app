import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.31:3000/";

// axios.interceptors.request.use(async config =>{
//   var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
//   console.log(accessToken);
//   // config.headers['Authorization'] = accessToken ? accessToken : '';
//   config.headers['Authorization']  = accessToken ?? "test";

//   config.headers['common'].Authorization = accessToken ?? "test";

//   return config;
// });

// const getAccessToken = async () => {
//   const accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
//   return accessToken;
// }

const ApiService = (() => {
  class ApiService {
    constructor() {
      this._axios = axios;
    }

    GetDefaultPage() {
      return this._axios.get();
    }

    // PROFILE
    GetUserData(userId) {
      const endPoint = "profile/metaData";
      return this._axios.post(`${endPoint}`, {
        userId,
      });
    }

    async UpdateUserProfile(userName, password, userId) {
      var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
      const endPoint = "profile/update";
      return this._axios.post(`${endPoint}`, {
        userName,
        password,
        userId,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    // AUTH
    RegisterUser(userName, password) {
      const endPoint = "auth/register";
      return this._axios.post(`${endPoint}`, {
        userName,
        password,
      });
    }

    LoginUser(userName, password) {
      console.log("api-service-login");
      const endPoint = "auth/login";
      return this._axios.post(`${endPoint}`, {
        userName,
        password,
      });
    }

    //HOME_PAGE
    async SavePost(userId, text) {
      var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
      const endPoint = "home-page/save-post";
      return this._axios.post(`${endPoint}`, {
        userId,
        text,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    GetAllPosts() {
      console.log("api-service-get-posts");
      const endPoint = "home-page/posts";
      return this._axios.get(`${endPoint}`);
    }

    //MY_POSTS_PAGE
    GetUserPosts(userId) {
      const endPoint = `my-posts/posts/${userId}`;
      return this._axios.get(`${endPoint}`, {
        userId,
      });
    }

    async DeletePost(postId) {
      var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
      const endPoint = "my-posts/delete";
      return this._axios.post(`${endPoint}`, {
        postId,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    async UpdatePost(postId, text) {
      var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
      const endPoint = "my-posts/update";
      return this._axios.post(`${endPoint}`, {
        postId,
        text,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
  }
  return new ApiService();
})();

export default ApiService;
