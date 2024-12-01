import { axiosInstance } from "../CustomAxios";



export const PostWifiConfigure = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/wifi/configure', data);
    return response
  } catch (error) {
    throw error
  }

}

export const PostWifiStart = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/wifi/start');
    return response
  } catch (error) {
    throw error
  }

}
export const PostWifistop = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post('/wifi/stop');
    return response
  } catch (error) {
    throw error
  }

}