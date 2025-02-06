import {getTodayStartDate} from '@/shared/lib/date/getTodayStartDate';
import {useState, useEffect} from 'react';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';

interface Props {
  startDate: string;
  endDate?: string;
}
interface StepData {
  date: string;
  value: number;
}

const useGoogleFit = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [dailyStep, setDailyStep] = useState(0);
  const [periodStepData, setPeriodStepData] = useState<StepData[]>([]);
  const [error, setError] = useState('');

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_LOCATION_READ,
    ],
  };

  useEffect(() => {
    const initializeGoogleFit = async () => {
      try {
        const authResult = await GoogleFit.authorize(options);
        if (authResult.success) {
          setIsAuthorized(true);
          await startRecording();
          await getDailySteps();
        } else {
          setError('Google Fit 인증 실패: ' + authResult.message);
        }
      } catch (err) {
        setError('Google Fit 초기화 오류');
      }
    };

    initializeGoogleFit();
  }, []);

  const startRecording = async () => {
    try {
      GoogleFit.startRecording(callback => {}, ['step']);
    } catch (err) {
      setError('Recording 시작 오류');
    }
  };

  const getDailySteps = async () => {
    try {
      const results = await GoogleFit.getDailySteps(
        getTodayStartDate() as Date,
      );
      const stepCount = results[2].steps[0].value;
      setDailyStep(stepCount);
    } catch (err) {
      setError('일간 걸음 수 데이터 가져오기 오류');
    }
  };

  const getPeriodStepDataList = async ({
    startDate,
    endDate = new Date().toISOString(),
  }: Props) => {
    try {
      const results = await GoogleFit.getDailyStepCountSamples({
        startDate,
        endDate,
        bucketUnit: BucketUnit.DAY,
        bucketInterval: 1,
      });
      setPeriodStepData(results[2].steps);
    } catch (err) {
      setError('일간 걸음 수 데이터 가져오기 오류');
    }
  };

  return {isAuthorized, dailyStep, periodStepData, error};
};

export default useGoogleFit;
