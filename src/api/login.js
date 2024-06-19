import { axiosInstance } from "../CustomAxios";



export const PostLogin = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/auth/login', data);
    return response
  } catch (error) {
    throw error
  }

}