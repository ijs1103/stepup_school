import {useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {useEffect} from 'react';

export interface ClassInfoResponse {
  [key: string]: number;
}

const queryFn = async (schoolName: string): Promise<ClassInfoResponse> => {
  const response = await axios.get<ClassInfoResponse>(
    `${BASE_URL}/schools/${schoolName}/grades`,
  );
  return response.data;
};

export const useClassInfo = (schoolName: string | undefined) => {
  const queryClient = useQueryClient();

  const query = useQuery<ClassInfoResponse, Error>({
    queryKey: ['classInfo', schoolName],
    queryFn: () => queryFn(schoolName!),
    retry: false,
    enabled: !!schoolName,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (schoolName) {
      queryClient.invalidateQueries({queryKey: ['classInfo', schoolName]});
    }
  }, [schoolName, queryClient]);

  return query;
};
