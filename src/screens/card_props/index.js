import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SafeAreaView from '../../components/safe_area/view';
import { styles } from '../../styles';
import * as action from '../../redux/action';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {
  launchCameraPickerAsync,
  launchLibraryPickerAsync,
} from '../../features/image_picker';
import SubmitView from './submit_view';
import ImageView from './image_view';
import TextInputView from './text_input_view';

function CameraPickerAreaView({ onPress }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.flexColumnCenter,
          styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.width,
            marginVertical: cardArea.margin,
            backgroundColor: 'white',
          },
        ]}
      >
        <Image
          source={require('../../../assets/symbol-camera.png')}
          style={[
            {
              width: cardArea.width - 2,
              height: cardArea.width - 2,
            },
          ]}
          resizeMode={'contain'}
        />
      </View>
    </TouchableOpacity>
  );
}

function MediaLibraryPickerAreaView({ onPress }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.flexColumnCenter,
          styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.width,
            marginVertical: cardArea.margin,
            backgroundColor: 'white',
          },
        ]}
      >
        <Image
          source={require('../../../assets/symbol-image-library.png')}
          style={[{ width: cardArea.width - 2, height: cardArea.width - 2 }]}
          resizeMode={'contain'}
        />
      </View>
    </TouchableOpacity>
  );
}

function SoundRecorderAreaView({ recording, onPress }) {
  const cardArea = useSelector((state) => state.cardArea);

  function IconRecordStartAreaView() {
    return (
      <Image
        source={require('../../../assets/symbol-record.png')}
        style={[
          {
            width: cardArea.width - 2,
            height: cardArea.width - 48,
          },
        ]}
        resizeMode={'contain'}
      />
    );
  }

  function IconRecordStopAreaView() {
    return (
      <View
        style={{
          position: 'absolute',
          alignContent: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            top: (cardArea.width - 8) / 2,
            alignSelf: 'center',
          }}
        >
          <FontAwesome
            name="circle"
            size={cardArea.width - 4}
            color="#009EFF"
          />
        </View>
        <View
          style={{
            // width: cardArea.width - 16,
            // height: cardArea.width - 16,
            alignSelf: 'center',
            bottom: (cardArea.width - 8 - cardArea.margin) / 2,
          }}
        >
          <MaterialIcons name="stop" size={cardArea.width - 16} color="white" />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.flexColumnCenter,
          styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.width,
            marginVertical: cardArea.margin,
            backgroundColor: 'white',
          },
        ]}
      >
        {recording ? <IconRecordStopAreaView /> : <IconRecordStartAreaView />}
      </View>
    </TouchableOpacity>
  );
}

export default function CardPropsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const index = route.params.index;
  const dispatch = useDispatch();

  const catalogue = useSelector((state) => state.catalogue.list);

  const [imageUri, setImageUri] = useState(catalogue[index].imageUri);
  const [txt, setTxt] = useState(catalogue[index].text);
  const [soundUri, setSoundUri] = useState(catalogue[index].soundUri);

  const [recording, setRecording] = useState(false);

  async function onPressCameraPickerAsync() {
    const uri = await launchCameraPickerAsync();
    if (uri) {
      setImageUri(uri);
    }
  }

  async function onPressLibraryPickerAsync() {
    const uri = await launchLibraryPickerAsync();
    if (uri) {
      setImageUri(uri);
    }
  }

  function onPressRecording() {
    setRecording((state) => !state);
  }

  function onPressSubmit() {
    // dispatch(action.setCatalogueText({ index, text }));
    // dispatch(action.setCatalogueImageUri({ index, imageUri }));
    // dispatch(action.setCatalogueSoundUri({ index, soundUri }));

    navigation.goBack();
  }

  return (
    <SafeAreaView onLayout={null}>
      <View style={(styles.flexColumnCenter, [])}>
        <ImageView imageUri={imageUri} />

        <TextInputView txt={txt} setTxt={setTxt} />

        <CameraPickerAreaView onPress={onPressCameraPickerAsync} />
        <MediaLibraryPickerAreaView onPress={onPressLibraryPickerAsync} />
        <SoundRecorderAreaView
          recording={recording}
          onPress={onPressRecording}
        />

        <SubmitView onPress={onPressSubmit} />
      </View>
    </SafeAreaView>
  );
}
