import CryptoJS from 'crypto-js';

// Encrpty AES Helper
const encryptData = (data: string, key: string, iv: string): string => {
    const keyWordArray = CryptoJS.enc.Utf8.parse(key);
    const ivWordArray = CryptoJS.enc.Utf8.parse(iv);

    const encrypted = CryptoJS.AES.encrypt(data, keyWordArray, { iv: ivWordArray }).toString();
    return encrypted;
};

// Usage
const encryptedUsername = encryptData(formData.username, process.env.NEXT_PUBLIC_AUTHENTICATION_KEY, process.env.NEXT_PUBLIC_AUTHENTICATION_IV);
const encryptedPassword = encryptData(formData.password, process.env.NEXT_PUBLIC_AUTHENTICATION_KEY, process.env.NEXT_PUBLIC_AUTHENTICATION_IV);
