import { axiosInstance } from "../CustomAxios";

export const getAllvisitors = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get('/visit/visitors/count');
    return response
  } catch (error) {
    throw error
  }

}
