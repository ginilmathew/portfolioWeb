import { axiosInstance } from "../CustomAxios";

export const getuser = async () => {
  try {
    const response = await axiosInstance.get('/user/me');
    return response
  } catch (error) {
    throw error
  }

}


export const updateUser = async (data) => {
  try {
    const response = await axiosInstance.put(`/user/update`, data);
    return response
  } catch (error) {
    throw error
  }
}