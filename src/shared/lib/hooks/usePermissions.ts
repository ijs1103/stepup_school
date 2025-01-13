import {useState, useEffect, useRef, useCallback} from 'react';
import {
  Platform,
  PermissionsAndroid,
  AppState,
  AppStateStatus,
} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  requestNotifications,
  PermissionStatus,
} from 'react-native-permissions';

type PermissionStatuses = {
  locationAlways: PermissionStatus | undefined;
  notifications: PermissionStatus | undefined;
  photoLibrary: PermissionStatus | undefined;
};

const usePermissions = () => {
  const [permissions, setPermissions] = useState<PermissionStatuses>({
    locationAlways: undefined,
    notifications: undefined,
    photoLibrary: undefined,
  });
  const [hasRequestedPermissions, setHasRequestedPermissions] = useState(false);
  const appState = useRef(AppState.currentState);

  const requestPermissions = useCallback(async () => {
    let locationAlways: PermissionStatus | undefined,
      notifications: PermissionStatus | undefined,
      photoLibrary: PermissionStatus | undefined;

    if (Platform.OS === 'ios') {
      locationAlways = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      const {status} = await requestNotifications(['alert', 'sound', 'badge']);
      notifications = status;
      photoLibrary = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    } else if (Platform.OS === 'android') {
      try {
        // 위치 권한 요청
        const fineLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (fineLocation === RESULTS.GRANTED) {
          locationAlways = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          )) as PermissionStatus;
        } else {
          locationAlways = fineLocation as PermissionStatus;
        }

        // 알림 권한 요청
        if (Platform.Version >= 33) {
          notifications = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          )) as PermissionStatus;
        } else {
          notifications = 'granted' as PermissionStatus;
        }

        // 사진 라이브러리 권한 요청
        if (Platform.Version >= 33) {
          photoLibrary = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          )) as PermissionStatus;
          if (photoLibrary !== RESULTS.GRANTED) {
            photoLibrary = (await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            )) as PermissionStatus;
          }
        } else {
          photoLibrary = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          )) as PermissionStatus;
        }
      } catch (err) {
        console.warn(err);
      }
    }

    setPermissions({locationAlways, notifications, photoLibrary});
    setHasRequestedPermissions(true);
  }, []);

  useEffect(() => {
    requestPermissions();
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          requestPermissions();
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [requestPermissions]);

  return {permissions, hasRequestedPermissions};
};

export default usePermissions;
