import { Response, Request, NextFunction } from 'express';

// Declare global types first
declare global {
  namespace express {
     export interface Response {

        customResponse: (
        isSuccess: boolean,
        messageNumber: number,
        status: number,
        additionalInfo: string,
        payload: {
          totalData?: number;
          startData?: number;
          endData?: number;
          data: any;
        }
      ) => void;

    } 
  }
}

// Create resHelper.ts in your utils folder
const resHelper = (req: Request, res: Response, next: NextFunction) => {
  res.customResponse = (
    isSuccess: boolean,
    messageNumber: number,
    status: number,
    additionalInfo: string,
    payload: {
      totalData?: number;
      startData?: number;
      endData?: number;
      data: any;
    }
  ) => {
    res.status(status).json({
      isSuccess,
      messageNumber,
      additionalInfo,
      payload
    });
  };

  next();
};

export default resHelper;

// Usage
import resHelper from './src/utils/resHelper';
app.use(resHelper)

app.get('/', (req, res) => {

  const payload = {
    totalData: 100,
    startData: 1,
    endData: 10,
    data: { items: ['item1', 'item2'] }
  };

  // [isSuccess : boolean, messageNumber: number, statusCode: number, additionalInfo: string, data]
  return res.customResponse(true, 5001, 200, 'Request successful', payload);
});

// Response
// Status Code : 200 OK
{
    "isSuccess": true,
    "messageNumber": 5001,
    "additionalInfo": "Request successful",
    "payload": {
        "totalData": 100,
        "startData": 1,
        "endData": 10,
        "data": {
            "items": [
                "item1",
                "item2"
            ]
        }
    }
}

// NB : Maybe this helper may need some improvement for some case
