import { axiosInstance } from "../CustomAxios";



export const getProfile = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get('/user/me');
    return response
  } catch (error) {
    throw error
  }

}