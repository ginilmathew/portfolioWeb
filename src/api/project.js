import { axiosInstance } from "../CustomAxios";



export const getProjectList = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get('/project/projects');
    return response
  } catch (error) {
    throw error
  }

}