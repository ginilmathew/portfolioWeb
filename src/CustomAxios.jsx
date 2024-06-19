import axios from 'axios';
import { BASE_URL } from './config';




const API_TIMEOUT_MS = 5000;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT_MS,
});

const requestHandler = (request) => {

  let token = localStorage.getItem("token");

  console.log({ token }, 'in axios')
  // Token will be dynamic so we can use any app-specific way to always   
  // fetch the new token before making the call
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

const responseHandler = async (response) => {
  if (response.status === 200) {
    // handle success case
  } else if (response.status === 403) {
    // handle unauthorized case
    await localStorage.clear();
  } else if (response.status === 404) {
    // handle not found case
  } else {
    // handle other cases
  }

  return response;
};

axiosInstance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// const fetchData = async (url) => {
//   try {
//     const response = await axiosInstance.get(url);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// const postData = async (url, data) => {
//   try {
//     const response = await axiosInstance.post(url, data);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteData = async (url) => {
//   try {
//     const response = await axiosInstance.delete(url);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

async function errorHandler (error) {
  console.log({ error: error.response.data.message }, 'statusss ');
  if (error?.response?.data?.message === "Unauthenticated") {
    localStorage.clear();
    window.location.href = '/login';


    // await userContext.setUser(response.data.user)
  }
  if (error.response.data.message) {
    console.log({ error: error.response.data.message })

    throw new Error(error.response.data.message);
  } else {
    throw new Error(error);
  }
  // throw new Error(error.response.data.message);
}

export { axiosInstance }