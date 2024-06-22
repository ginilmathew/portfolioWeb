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
export const createproject = async (data) => {
  try {
    const response = await axiosInstance.post('/project/projects', data);
    return response
  } catch (error) {
    throw error
  }

}

export const updateproject = async (data) => {
  try {
    const response = await axiosInstance.put(`/project/projects/${data._id}`, data);
    return response
  } catch (error) {
    throw error
  }
}

export const delteproject = async (id) => {
  try {
    const response = await axiosInstance.delete(`/project/projects/${id}`);
    return response
  } catch (error) {
    throw error
  }
}
