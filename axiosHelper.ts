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
  const baseUrl = "Your API URL"; // Base URL
  console.log(baseUrl)
  let accessToken = Cookies.get('accessToken');
  let config: AxiosRequestConfig = { 
    method: method,
    url: `${baseUrl}${url}`, 
    data: data || null,
     headers: {
      'ApiKey': process.env.NEXT_PUBLIC_API_KEY,
      ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    }
    // Depends on your flow
    // headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : undefined
  };

  // console.log(config.headers, 'CONFIG HEADERSSS SLURR')

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

      if (error.response.status === 401) {
      const errorMessage = error?.response.data.additionalInfo || 'Unauthorized';
      setTimeout(() => {
        Cookies.remove('accessToken');
        window.location.reload();
      }, 5000);
      throw new Error(errorMessage);
      }
      
      throw new Error(error?.response.data.additionalInfo)
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
