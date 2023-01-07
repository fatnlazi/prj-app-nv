import {
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';

const imagePickerOptions = {
  mediaTypes: MediaTypeOptions.Images,
  // allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
};

export async function launchCameraPickerAsync() {
  let uri = '';

  const { granted } = await requestCameraPermissionsAsync();
  if (granted) {
    const result = await launchCameraAsync(imagePickerOptions);

    if (!result.canceled) {
      uri = result.assets[0].uri;
    }
  }

  return uri;
}

export async function launchLibraryPickerAsync() {
  let uri = '';

  const { granted } = await requestMediaLibraryPermissionsAsync();
  if (granted) {
    const result = await launchImageLibraryAsync(imagePickerOptions);

    if (!result.canceled) {
      uri = result.assets[0].uri;
    }
  }

  return uri;
}
