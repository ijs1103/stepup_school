import {Platform} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';

const GOOGLE_FIT_OPTIONS = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_LOCATION_READ,
  ],
};

const setupGoogleFit = async () => {
  if (Platform.OS !== 'android') {
    return;
  }
  try {
    const authorized = await GoogleFit.authorize(GOOGLE_FIT_OPTIONS);
    if (authorized.success) {
      GoogleFit.startRecording(
        callback => {
          if (callback.recording) {
            console.log('Google Fit recording started successfully');
          } else {
            console.log('Failed to start Google Fit recording');
          }
        },
        ['step'],
      );
    }
  } catch (error) {
    console.log('Google Fit setup error: ', error);
  }
};

export default setupGoogleFit;
