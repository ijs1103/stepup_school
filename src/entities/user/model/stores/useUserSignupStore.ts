import {create} from 'zustand';

interface AuthInfo {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

interface SchoolInfo {
  schoolCode: string;
  grade: number;
  class: number;
}

interface BodyInfo {
  gender: '여성' | '남성' | '';
  birthDate: string;
  height: number;
  weight: number;
}

interface UserSignupState {
  authInfo: AuthInfo;
  schoolInfo: SchoolInfo;
  bodyInfo: BodyInfo;
  setAuthInfo: (info: Partial<AuthInfo>) => void;
  setSchoolInfo: (info: Partial<SchoolInfo>) => void;
  setBodyInfo: (info: Partial<BodyInfo>) => void;
  reset: () => void;
}

const initialAuthInfo: AuthInfo = {
  name: '',
  nickname: '',
  email: '',
  password: '',
};

const initialSchoolInfo: SchoolInfo = {
  schoolCode: '',
  grade: 0,
  class: 0,
};

const initialBodyInfo: BodyInfo = {
  gender: '',
  birthDate: '',
  height: 0,
  weight: 0,
};

export const useUserSignupStore = create<UserSignupState>(set => ({
  authInfo: initialAuthInfo,
  schoolInfo: initialSchoolInfo,
  bodyInfo: initialBodyInfo,
  setAuthInfo: info =>
    set(state => ({
      authInfo: {...state.authInfo, ...info},
    })),
  setSchoolInfo: info =>
    set(state => ({
      schoolInfo: {...state.schoolInfo, ...info},
    })),
  setBodyInfo: info =>
    set(state => ({
      bodyInfo: {...state.bodyInfo, ...info},
    })),
  reset: () =>
    set({
      authInfo: initialAuthInfo,
      schoolInfo: initialSchoolInfo,
      bodyInfo: initialBodyInfo,
    }),
}));
