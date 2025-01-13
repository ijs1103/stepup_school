import {create} from 'zustand';

interface AuthInfo {
  userId: string;
  name: string;
  nickname: string;
  password: string;
}

export interface SchoolInfo {
  name: string;
  grade: number;
  class: number;
}

export interface BodyInfo {
  gender: '여성' | '남성';
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
  userId: '',
  name: '',
  nickname: '',
  password: '',
};

export const initialSchoolInfo: SchoolInfo = {
  name: '',
  grade: 0,
  class: 0,
};

const initialBodyInfo: BodyInfo = {
  gender: '남성',
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
