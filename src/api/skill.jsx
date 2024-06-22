import { axiosInstance } from "../CustomAxios";



export const getAllSkill = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get('/skill/skills');
    return response
  } catch (error) {
    throw error
  }

}

export const createSkill = async (data) => {
  try {
    const response = await axiosInstance.post('/skill/skills', data);
    return response
  } catch (error) {
    throw error
  }

}

export const updateSkill = async (data) => {
  try {
    const response = await axiosInstance.put(`/skill/skills/${data._id}`, data);
    return response
  } catch (error) {
    throw error
  }
}

export const delteSkill = async (id) => {
  try {
    const response = await axiosInstance.delete(`/skill/skills/${id}`);
    return response
  } catch (error) {
    throw error
  }
}
