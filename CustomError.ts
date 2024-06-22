// CustomError.ts
class CustomError extends Error {
    isSuccess: boolean;
    messageNumber: number;
    additionalInfo: string;
  
    constructor(isSuccess: boolean, messageNumber: number, additionalInfo: string, ...params: any[]) {
      super(...params);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
      this.isSuccess = isSuccess;
      this.messageNumber = messageNumber;
      this.additionalInfo = additionalInfo;
    }
  }
  
  export default CustomError;
