import {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
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

  const requestPermissions = async () => {
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
        locationAlways = (await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        )) as PermissionStatus;

        if (Platform.Version >= 33) {
          notifications = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          )) as PermissionStatus;
        } else {
          notifications = 'granted' as PermissionStatus;
        }

        photoLibrary = (await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        )) as PermissionStatus;
      } catch (err) {
        console.warn(err);
      }
    }

    setPermissions({locationAlways, notifications, photoLibrary});
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return permissions;
};

export default usePermissions;
