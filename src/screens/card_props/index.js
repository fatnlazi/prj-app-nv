import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import SafeAreaView from '../../components/safe_area/view';
import { styles } from '../../styles';

function ImageAreaView({ imageUri }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <View
      style={[
        styles.flexColumnCenter,
        styles.border,
        styles.borderRound,
        {
          width: cardArea.width,
          height: cardArea.width,
          marginTop: cardArea.margin,
          borderBottomStartRadius: 0,
          borderBottomEndRadius: 0,
          borderBottomWidth: 0,
        },
      ]}
    >
      {imageUri ? (
        <Image
          style={[
            styles.borderRound,
            {
              width: cardArea.width,
              height: cardArea.width,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

function TextAreaView({ text, setText }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <View
      style={[
        styles.flexColumnCenter,
        styles.border,
        styles.borderRound,
        {
          width: cardArea.width,
          height: cardArea.height - cardArea.width,
          marginBottom: cardArea.margin,
          borderTopStartRadius: 0,
          borderTopEndRadius: 0,
        },
      ]}
    >
      <TextInput
        style={[{ fontSize: cardArea.height - cardArea.width - 8 }]}
        placeholder={'TIÊU ĐỀ'}
        value={text}
        onChangeText={(str) => {
          setText(str);
        }}
        autoCapitalize={'sentences'}
      />
    </View>
  );
}

function CameraPickerAreaView({ setImageUri }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <TouchableOpacity onPress={null}>
      <View
        style={[
          styles.flexColumnCenter,
          styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.width,
            marginVertical: cardArea.margin,
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

function MediaLibraryPickerAreaView({ setImageUri }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <TouchableOpacity onPress={null}>
      <View
        style={[
          styles.flexColumnCenter,
          styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.width,
            marginVertical: cardArea.margin,
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

function SoundRecorderAreaView({ setSoundUri }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <TouchableOpacity onPress={null}>
      <View
        style={[
          styles.flexColumnCenter,
          styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.width,
            marginVertical: cardArea.margin,
          },
        ]}
      >
        <Image
          source={require('../../../assets/symbol-record.png')}
          style={[
            {
              width: cardArea.width - 2,
              height: cardArea.height - cardArea.width,
            },
          ]}
          resizeMode={'contain'}
        />
      </View>
    </TouchableOpacity>
  );
}

function SubmitAreaView({ text, imageUri, soundUri }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <TouchableOpacity onPress={null}>
      <View
        style={[
          styles.flexColumnCenter,
          styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.height - cardArea.width + cardArea.margin,
            marginVertical: cardArea.margin,
          },
        ]}
      >
        <Text style={[{ fontSize: cardArea.height - cardArea.width - 8 }]}>
          {'XONG'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function CardPropsScreen() {
  const [imageUri, setImageUri] = useState('');
  const [text, setText] = useState('');
  const [soundUri, setSoundUri] = useState('');

  return (
    <SafeAreaView onLayout={null}>
      <View style={(styles.flexColumnCenter, [])}>
        <ImageAreaView imageUri={imageUri} />
        <TextAreaView text={text} setText={setText} />
        <CameraPickerAreaView setImageUri={setImageUri} />
        <MediaLibraryPickerAreaView setImageUri={setImageUri} />
        <SoundRecorderAreaView setSoundUri={setSoundUri} />
        <SubmitAreaView text={text} imageUri={imageUri} soundUri={soundUri} />
      </View>
    </SafeAreaView>
  );
}
