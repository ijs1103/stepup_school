import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';

export interface RegisteredSchool {
  name: string;
  school_type: 1 | 2 | 3;
}

const queryFn = async (): Promise<string[]> => {
  const response = await axios.get<[RegisteredSchool]>(`${BASE_URL}/schools`);
  return response.data.map(value => value.name);
};

export const useRegisteredSchools = () => {
  return useQuery<string[], Error>({
    queryKey: ['registeredSchools'],
    queryFn,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
