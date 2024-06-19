// Imagine if your API Behavior like this (need the API Gateway to protect your endpoint and parameter), use this api helper
{
    "endpoint" : "encryptedEndpoint",
    "parameter" : "encryptedParameter"
}

// Example Below

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

interface AxiosHelperProps {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  parameter?: any;
}

// Encrypt AES Helper 
const encryptData = (data: string, key: string, iv: string): string => {
  const keyWordArray = CryptoJS.enc.Utf8.parse(key);
  const ivWordArray = CryptoJS.enc.Utf8.parse(iv);

  const encrypted = CryptoJS.AES.encrypt(data, keyWordArray, { iv: ivWordArray }).toString();
  return encrypted;
};

const axiosHelperGateway = async ({ endpoint, parameter, method  }: AxiosHelperProps): Promise<any> => {
  const requestUrl = "YOUR API URL";
  const baseUrl = "YOUR API URL";
  const accessToken = Cookies.get('accessToken');
  
  // Ensure that secret key and IV (Optional Key) is matching with your server (communicate with your backend)
  const encryptedEndpoint = encryptData(baseUrl, process.env.NEXT_PUBLIC_AUTHENTICATION_KEY, process.env.NEXT_PUBLIC_AUTHENTICATION_IV);
  const encryptedParameter = parameter ? encryptData(JSON.stringify(parameter), process.env.NEXT_PUBLIC_AUTHENTICATION_KEY, process.env.NEXT_PUBLIC_AUTHENTICATION_IV) : null;

  const config: AxiosRequestConfig = {
    url: requestUrl,
    method: method,
    // Encrypt the endpoint and payload using AES method 
    data: encryptedParameter ? { endpoint: encryptedEndpoint, parameter: encryptedParameter } : { endpoint: encryptedEndpoint },
    headers: {
      'ApiKey': process.env.NEXT_PUBLIC_API_KEY,
      ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
    }
  };

  try {
    const response: AxiosResponse = await axios(config);
    console.log(config.data, 'CONFIG DATA AXIOS HELPER GATEWAY')
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);

      if (error.response.status === 401) {
        const errorMessage = error.response.data.additionalInfo || 'Unauthorized';
        setTimeout(() => {
          Cookies.remove('accessToken');
          window.location.reload();
        }, 7500);
        throw new Error(errorMessage);
      }

      // throw new Error(error.response.data.additionalInfo);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    throw new Error(error.message);
  }
};

export default axiosHelperGateway;


// Usage Example 
const payload = {
  pageIndex: 1,
  pageSize: 30,
  showDeleted: false,
  ascending: true
}

const response: AxiosResponse = await axiosHelperGateway({
    endpoint: 'YOUR API ENDPOINT',
    method: 'POST',
    parameter: payload // Will be strigify in the axiosHelperGateway
  })
