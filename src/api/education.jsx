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

export const createEducation = async (data) => {
  try {
    const response = await axiosInstance.post('/education/education', data);
    return response
  } catch (error) {
    throw error
  }

}

export const updateEducation = async (data) => {
  try {
    const response = await axiosInstance.put(`/education/education/${data._id}`, data);
    return response
  } catch (error) {
    throw error
  }
}

export const delteEducation = async (id) => {
  try {
    const response = await axiosInstance.delete(`/education/education/${id}`);
    return response
  } catch (error) {
    throw error
  }
}

