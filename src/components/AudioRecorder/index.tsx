import { Audio } from "expo-av";

export async function startVoiceRecordAsync(
  onRecordingStatusUpdate:
    | ((status: Audio.RecordingStatus) => void)
    | null = null
): Promise<Audio.Recording | undefined> {
  let { granted } = await Audio.requestPermissionsAsync();
  if (granted) {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.LOW_QUALITY,
      onRecordingStatusUpdate
    );
    return recording;
  }
  return undefined;
}

export async function stopVoiceRecordAsync(
  recording: Audio.Recording
): Promise<string> {
  let uri = "";
  if (recording) {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
    await recording.stopAndUnloadAsync();
    uri = recording.getURI();
  }
  return uri;
}

export async function createPlaybackAsync(
  uri: string = "",
  onPlaybackStatusUpdate: ((status) => void) | null = null
): Promise<Audio.Sound> {
  const { sound } = await Audio.Sound.createAsync(
    { uri: uri },
    {},
    onPlaybackStatusUpdate
  );
  return sound;
}

export async function destroyPlaybackAsync(sound: Audio.Sound): Promise<void> {
  await sound.unloadAsync();
}

export async function playPlaybackAsync(sound: Audio.Sound): Promise<void> {
  await sound.playAsync();
}

export async function replayPlaybackAsync(sound: Audio.Sound): Promise<void> {
  await sound.replayAsync();
}

export async function stopPlaybackAsync(sound: Audio.Sound): Promise<void> {
  await sound.stopAsync();
}

export async function pausePlaybackAsync(sound: Audio.Sound): Promise<void> {
  await sound.pauseAsync();
}
