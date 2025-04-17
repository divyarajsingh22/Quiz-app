import { default as axiosInstance } from './index';

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/register', payload);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { error: 'Unknown error' };
  }
}

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/users/login', payload);
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { error: 'Unknown error' };
  }
}

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post('/api/users/get-user-info');
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : { error: 'Unknown error' };
  }
}
