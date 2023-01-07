import { Audio } from 'expo-av';

export async function startVoiceRecordAsync(onRecordingStatusUpdate = null) {
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

export async function stopVoiceRecordAsync(recording) {
  let uri = '';
  if (recording) {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
    await recording.stopAndUnloadAsync();
    uri = recording.getURI() || '';
  }
  return uri;
}

export async function createPlaybackAsync(
  uri = '',
  onPlaybackStatusUpdate = null
) {
  const { sound } = await Audio.Sound.createAsync(
    { uri: uri },
    {},
    onPlaybackStatusUpdate
  );
  return sound;
}

export async function destroyPlaybackAsync(sound) {
  await sound.unloadAsync();
}

export async function playPlaybackAsync(sound) {
  await sound.playAsync();
}

export async function replayPlaybackAsync(sound) {
  await sound.replayAsync();
}

export async function stopPlaybackAsync(sound) {
  await sound.stopAsync();
}

export async function pausePlaybackAsync(sound) {
  await sound.pauseAsync();
}
