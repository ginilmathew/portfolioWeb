import { axiosInstance } from "../CustomAxios";



export const PostAi = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/ai/ai-ginil', data);
    return response
  } catch (error) {
    throw error
  }

}