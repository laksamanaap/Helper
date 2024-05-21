import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation'

interface AxiosHelperProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  accessToken?: string;
}

const axiosHelper = async ({ url, method, data }: AxiosHelperProps): Promise<any> => {
  const baseUrl = "https://api.ultramedica-apps.com"; // Base URL
  console.log(baseUrl)
  let accessToken = Cookies.get('accessToken');
  let config: AxiosRequestConfig = { 
    method: method,
    url: `${baseUrl}${url}`, 
    data: data || null,
    headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : undefined
  };

  try {
    const response: AxiosResponse = await axios(config);
    console.log(response, "RESPONSE FROM HELPER")
    console.log(config, 'RESPONSE HELPER CONFIG')
  
    console.log(config.headers, 'RESPONSE HEADERS')

    return response?.data?.payload;

  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);

      // Temporary (nyobak lur)
      if (error.response.status === 404) {
        // Throw to catch
        throw new Error(error.response.data.additionalInfo);
      }

      if (error.response.status === 401) {
        Cookies.remove('accessToken');
        redirect('/auth/login')
      }

    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }
    throw new Error(error.message);
  }
};

export default axiosHelper;
