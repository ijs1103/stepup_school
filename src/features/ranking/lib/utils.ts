import { ParsedClassRanking } from '../model/useClassRanking';
import { ParsedPersonalRanking } from '../model/usePersonalRanking';

interface RankingData {
    name: string;
    [key: string]: string | number;
}

export const mapToRankingData = (
  data: ParsedPersonalRanking[] | ParsedClassRanking[] | undefined,
  isPersonal: boolean,
): RankingData[] => {
  return (
    data?.map(item => ({
      name: isPersonal
        ? (item as ParsedPersonalRanking).userName
        : (item as ParsedClassRanking).className,
      ...item,
    })) ?? []
  );
};
