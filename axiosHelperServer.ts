import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

// for SSR 
interface AxiosHelperProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}

const axiosHelperServer = async ({ url, method, data }: AxiosHelperProps): Promise<any> => {
  const baseUrl = "your api url"; // Base URL
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
    console.log(response, "RESPONSE FROM HELPER")
    console.log(config, 'RESPONSE HELPER CONFIG')
    console.log(config.headers, 'RESPONSE HEADERS')

    return response?.data?.payload;
  } catch (error: any) {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status)
      console.error('Response Headers:', error.response.headers);

      // if (error.response.status === 404) {
      //   // Throw to catch
      //   throw new Error(error.response.data.additionalInfo);
      // }

      if (error.response.status === 401) {
      const errorMessage = error?.response.data.additionalInfo || 'Unauthorized';
      setTimeout(() => {
        cookies().delete('accessToken');
        window.location.reload();
      }, 7500);
        throw new Error(errorMessage);
      }

      throw new Error(error?.response.data.additionalInfo)
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    throw new Error(error.message);
  }
};

export default axiosHelperServer;
