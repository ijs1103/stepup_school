import axios from 'axios';
import {BASE_URL} from '@/shared/constants';

export const validateTokenAxiosFn = async (
  accessToken: string,
): Promise<boolean> => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/validate`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return true;
  } catch (error) {
    console.log(`useValidateToken 에러 - ${error}`);
    return false;
  }
};
