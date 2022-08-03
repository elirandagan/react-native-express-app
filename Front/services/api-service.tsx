import AsyncStorage from "@react-native-community/async-storage";
// import axios from "axios";
import { create } from "apisauce";

// var access_token: string | null = "";
// const getAccessToken = async () => {
//   access_token = await AsyncStorage.getItem("_ACCESS_TKN");
//   console.log(access_token);
// };

// getAccessToken();

const ApiService = create({
  baseURL: "http://192.168.1.31:3000/",
});

export const GetUserData = (userId: string) => {
  return ApiService.post("profile/metaData", {
    userId,
  });
};

export const UpdateUserProfile = async (
  userName: string,
  password: string,
  userId: string
) => {
  var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
  return ApiService.post(
    "profile/update",
    {
      userName,
      password,
      userId,
    },
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );
};

export const RegisterUser = (userName: string, password: string) => {
  return ApiService.post("auth/register", {
    userName,
    password,
  });
};

export const LoginUser = (userName: string, password: string) => {
  return ApiService.post("auth/login", {
    userName,
    password,
  });
};

export const LoginUserOnLoading = (userId: string, refreshToken: string) => {
  return ApiService.post(
    "auth/login-on-loading",
    {
      userId,
    },
    {
      headers: {
        Authorization: refreshToken,
      },
    }
  );
};

export const LogOut = (userId: string) => {
  return ApiService.post("auth/logout", {
    userId,
  });
};

export const SavePost = async (userId: string, text: string) => {
  var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
  return ApiService.post(
    "home-page/save-post",
    {
      userId,
      text,
    },
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );
};

export const GetAllPosts = () => {
  return ApiService.get("home-page/posts");
};

export const GetUserPosts = (userId: string) => {
  return ApiService.get(`my-posts/posts/${userId}`);
};

export const DeletePost = async (postId: string) => {
  var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
  return ApiService.post(
    "my-posts/delete",
    {
      postId,
    },
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );
};

export const UpdatePost = async (postId: string, text: string) => {
  var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
  return ApiService.post(
    "my-posts/update",
    {
      postId,
      text,
    },
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );
};

// axios.defaults.baseURL = "http://192.168.1.31:3000/";

// const ApiService = (() => {
//   class ApiService {
//     constructor() {
//       this._axios = axios;
//     }

//     GetDefaultPage() {
//       return this._axios.get();
//     }

//     // PROFILE
//     GetUserData(userId) {
//       const endPoint = "profile/metaData";
//       return this._axios.post(`${endPoint}`, {
//         userId,
//       });
//     }

//     async UpdateUserProfile(userName, password, userId) {
//       var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
//       const endPoint = "profile/update";
//       return this._axios.post(`${endPoint}`, {
//         userName,
//         password,
//         userId,
//       },{
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });
//     }

//     // AUTH
//     RegisterUser(userName, password) {
//       const endPoint = "auth/register";
//       return this._axios.post(`${endPoint}`, {
//         userName,
//         password,
//       });
//     }

//     LoginUser(userName, password) {
//       console.log("api-service-login");
//       const endPoint = "auth/login";
//       return this._axios.post(`${endPoint}`, {
//         userName,
//         password,
//       });
//     }

//     //HOME_PAGE
//     async SavePost(userId, text) {
//       var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
//       const endPoint = "home-page/save-post";
//       return this._axios.post(`${endPoint}`, {
//         userId,
//         text,
//       },{
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });
//     }

//     GetAllPosts() {
//       console.log("api-service-get-posts");
//       const endPoint = "home-page/posts";
//       return this._axios.get(`${endPoint}`);
//     }

//     //MY_POSTS_PAGE
//     GetUserPosts(userId) {
//       const endPoint = `my-posts/posts/${userId}`;
//       return this._axios.get(`${endPoint}`, {
//         userId,
//       });
//     }

//     async DeletePost(postId) {
//       var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
//       const endPoint = "my-posts/delete";
//       return this._axios.post(`${endPoint}`, {
//         postId,
//       },{
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });
//     }

//     async UpdatePost(postId, text) {
//       var accessToken = await AsyncStorage.getItem("_ACCESS_TKN");
//       const endPoint = "my-posts/update";
//       return this._axios.post(`${endPoint}`, {
//         postId,
//         text,
//       },{
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });
//     }
//   }
//   return new ApiService();
// })();

// export default ApiService;
