import axios from "axios";
// import logger from "./logService";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.interceptors.response.use(null, (error) => {
  console.log("INTERCEPTOR CALLED");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // logger.log(error);
    // toast.error("Unexpected error occured");
    alert("Unexpected error occured");
  }
  return Promise.reject(error);
});

export function setAuthorizationToken(token) {
  axios.defaults.headers["Authorization"] = token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAuthorizationToken,
};
