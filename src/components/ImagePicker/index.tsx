import {
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  ImagePickerOptions,
  MediaTypeOptions,
} from "expo-image-picker";

const pickerOption: ImagePickerOptions = {
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.02,
  mediaTypes: MediaTypeOptions.Images,
};

export async function launchCameraPickerAsync(): Promise<string> {
  let uri = "";

  const { granted } = await requestCameraPermissionsAsync();
  if (granted) {
    const result = await launchCameraAsync(pickerOption);
    if (!result.cancelled) {
      uri = result.uri;
    }
  }

  return uri;
}

export async function launchLibraryPickerAsync(): Promise<string> {
  let uri = "";

  const { granted } = await requestMediaLibraryPermissionsAsync();
  if (granted) {
    const result = await launchImageLibraryAsync(pickerOption);
    if (!result.cancelled) {
      uri = result.uri;
    }
  }

  return uri;
}
