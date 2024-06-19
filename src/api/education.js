import { axiosInstance } from "../CustomAxios";



export const getEducationList = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get('/education/education');
    return response
  } catch (error) {
    throw error
  }

}