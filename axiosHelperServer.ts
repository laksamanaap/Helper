import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

// for SSR 
interface AxiosHelperProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}

const axiosHelperServer = async ({ url, method, data }: AxiosHelperProps): Promise<any> => {
  const baseUrl = "your API url"; // Base URL
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  let config: AxiosRequestConfig = {
    method: method,
    url: `${baseUrl}${url}`,
    data: data || null,
    headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : undefined
  };

  try {
    const response: AxiosResponse = await axios(config);
    return response?.data?.payload;
  } catch (error: any) {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    throw new Error(error.message);
  }
};

export default axiosHelperServer;
