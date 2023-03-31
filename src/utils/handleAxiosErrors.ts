import axios from 'axios';
import decodeErrorMessage from './decodeErrorMessage';

export const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.message;
    return decodeErrorMessage(message);
  } else {
    const message = (error as Error).message;
    return decodeErrorMessage(message);
  }
};
