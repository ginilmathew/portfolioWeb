import { axiosInstance } from "../CustomAxios";



export const postBrowser = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/browser/browser-ginil', data);
    return response
  } catch (error) {
    throw error
  }

}