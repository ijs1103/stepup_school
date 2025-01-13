import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignInResponse} from '@/features/auth/model/useSignIn';

interface AuthState {
  isLoggedIn: boolean;
  userData: SignInResponse | null;
  setLoginData: (data: SignInResponse) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
  checkLoginStatus: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userData: null,
      setLoginData: (data: SignInResponse) =>
        set({
          isLoggedIn: true,
          userData: data,
        }),
      setAccessToken: (token: string) =>
        set(state => ({
          userData: state.userData
            ? {...state.userData, access_token: token}
            : null,
        })),
      logout: () => set({isLoggedIn: false, userData: null}),
      checkLoginStatus: () => {
        const state = get();
        return state.isLoggedIn && !!state.userData?.access_token;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
