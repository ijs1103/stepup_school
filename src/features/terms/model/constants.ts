import {AgreementKeys} from './types';

export enum TermsAgreementTitle {
  all = '전체 동의하기',
  agreement1 = '(필수) 개인정보 수집 이용 동의',
  agreement2 = '(필수) 위치기반 서비스 이용약관 동의',
  agreement3 = '(필수) 위치정보 수집 및 이용에 동의',
  agreement4 = '(필수) 개인정보 제3자 제공에 동의',
  agreement5 = '(선택) 프로모션 정보 수신 동의',
}

export const agreementKeys: AgreementKeys[] = [
  'agreement1',
  'agreement2',
  'agreement3',
  'agreement4',
  'agreement5',
];
