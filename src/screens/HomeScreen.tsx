import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { CommonStyle, FontSize } from "../constants";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  launchCameraPickerAsync,
  launchLibraryPickerAsync,
} from "../components/ImagePicker";
import {
  createPlaybackAsync,
  destroyPlaybackAsync,
  replayPlaybackAsync,
  startVoiceRecordAsync,
  stopVoiceRecordAsync,
} from "../components/AudioRecorder";
import { dbAddDataAsync, storageUploadAsync } from "../components/Firebase";

const { height: window_height, width: window_width } = Dimensions.get("window");
const window_padding = 10;
const cardDatabase_numberOfColumn = 4;
const cardTitle_height = 30;
const card_margin = 5;
const card_width = Math.floor(
  (window_width -
    window_padding -
    card_margin * 2 * (cardDatabase_numberOfColumn + 1)) /
    cardDatabase_numberOfColumn,
);
const card_height = card_width + cardTitle_height;
const card_fontSize = choosingFontSize(cardTitle_height);
const btn_img_height = 70;

function choosingFontSize(height: number) {
  let fontSize = height - 4;
  let k: keyof typeof FontSize;
  for (k in FontSize) {
    const v = FontSize[k];
    if (v < height) {
      fontSize = v;
      break;
    }
  }

  return fontSize;
}

type CardType = {
  title: string;
  imageUri: string;
  soundUri: string;
};

/*
 * +--------------------------------------------------------------------------+
 * |                                                                          |
 * +--------------------------------------------------------------------------+
 * | Card Picked                                                              |
 * | +------------+                                                           |
 * | | Card Image |                                                           |
 * | +------------+                                                           |
 * | | Card Title |                                                           |
 * | +------------+                                                           |
 * |                                                                          |
 * +--------------------------------------------------------------------------+
 * | Card Picker                                                              |
 * | +------------+                                                           |
 * | | Card Image |                                                           |
 * | +------------+                                                           |
 * | | Card Title |                                                           |
 * | +------------+                                                           |
 * |                                                                          |
 * +--------------------------------------------------------------------------+
 */

export default function HomeScreen() {
  // const navigation = useNavigation();
  const [cardCreationVisible, setCardCreationVisible] = useState(false);
  const [curCardIndex, setCurCardIndex] = useState<number>(-1);
  const [cardPicked, setCardPicked] = useState<CardType[]>([]);
  const [cardPicker, setCardPicker] = useState<CardType[]>([
    { title: "", imageUri: "", soundUri: "" }, // 00
    { title: "", imageUri: "", soundUri: "" }, // 01
    { title: "", imageUri: "", soundUri: "" }, // 02
    { title: "", imageUri: "", soundUri: "" }, // 03
    { title: "", imageUri: "", soundUri: "" }, // 04
    { title: "", imageUri: "", soundUri: "" }, // 05
    { title: "", imageUri: "", soundUri: "" }, // 06
    { title: "", imageUri: "", soundUri: "" }, // 07
    { title: "", imageUri: "", soundUri: "" }, // 08
    { title: "", imageUri: "", soundUri: "" }, // 09
    { title: "", imageUri: "", soundUri: "" }, // 10
    { title: "", imageUri: "", soundUri: "" }, // 11
    { title: "", imageUri: "", soundUri: "" }, // 12
    { title: "", imageUri: "", soundUri: "" }, // 13
    { title: "", imageUri: "", soundUri: "" }, // 14
    { title: "", imageUri: "", soundUri: "" }, // 15
    { title: "", imageUri: "", soundUri: "" }, // 16
    { title: "", imageUri: "", soundUri: "" }, // 17
    { title: "", imageUri: "", soundUri: "" }, // 18
    { title: "", imageUri: "", soundUri: "" }, // 19
    { title: "", imageUri: "", soundUri: "" }, // 20
    { title: "", imageUri: "", soundUri: "" }, // 21
    { title: "", imageUri: "", soundUri: "" }, // 22
    { title: "", imageUri: "", soundUri: "" }, // 23
    { title: "", imageUri: "", soundUri: "" }, // 24
    { title: "", imageUri: "", soundUri: "" }, // 25
    { title: "", imageUri: "", soundUri: "" }, // 26
    { title: "", imageUri: "", soundUri: "" }, // 27
    { title: "", imageUri: "", soundUri: "" }, // 28
    { title: "", imageUri: "", soundUri: "" }, // 29
    { title: "", imageUri: "", soundUri: "" }, // 30
    { title: "", imageUri: "", soundUri: "" }, // 31
    { title: "", imageUri: "", soundUri: "" }, // 32
    { title: "", imageUri: "", soundUri: "" }, // 33
    { title: "", imageUri: "", soundUri: "" }, // 34
    { title: "", imageUri: "", soundUri: "" }, // 35
  ]);
  const [imageUri, setImageUri] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined,
  );
  const [recordUri, setRecordUri] = useState<string>("");
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  function cardPicked_backspace() {
    setCardPicked((cards) => {
      let temp = cards;
      temp.pop();
      return [...temp];
    });
  }

  function cardPicked_push(card: CardType) {
    setCardPicked((cards) => [...cards, card]);
  }

  function CardPickedRender({ card }: { card: CardType }) {
    return (
      <View style={CurrentStyle.cardCtn}>
        <TouchableOpacity onPress={async () => await sound_play(card.soundUri)}>
          <View style={CurrentStyle.cardImageCtn}>
            {card.imageUri && (
              <Image
                source={{ uri: card.imageUri }}
                style={CurrentStyle.image}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={CurrentStyle.cardTextCtn}>
          <Text>{card.title}</Text>
        </View>
      </View>
    );
  }

  function card_create(card: CardType, index: number) {
    setCurCardIndex(index);
    setCardCreationVisible(true);
  }

  async function card_accept() {
    if (!text) {
      return;
    }

    if (!imageUri) {
      return;
    }

    if (!recordUri) {
      return;
    }

    setCardPicker((cards) => {
      let copied = cards;
      copied[curCardIndex].title = text;
      copied[curCardIndex].imageUri = imageUri;
      copied[curCardIndex].soundUri = recordUri;
      return copied;
    });
    card_deny();
  }

  function card_deny() {
    if (sound) {
      destroyPlaybackAsync(sound);
      setSound(undefined);
    }
    setImageUri("");
    setRecordUri("");
    setText("");
    setCardCreationVisible(false);
  }

  async function sound_play(soundUri: string) {
    const { sound } = await Audio.Sound.createAsync({
      uri: soundUri,
    });
    await sound.playAsync();
    sound.unloadAsync;
  }

  async function image_pickFromLibrary() {
    let uri = await launchLibraryPickerAsync();
    setImageUri(uri);
  }

  async function image_pickFromCamera() {
    let uri = await launchCameraPickerAsync();
    setImageUri(uri);
  }

  async function sound_replay() {
    if (sound) {
      await replayPlaybackAsync(sound);
    }
  }

  async function sound_recordingToggle() {
    if (recording) {
      setRecording(undefined);
      let uri = await stopVoiceRecordAsync(recording);
      setRecordUri(uri);
      let sound = await createPlaybackAsync(uri);
      setSound(sound);
    } else {
      let recording = await startVoiceRecordAsync();
      setRecording(recording);
    }
  }

  function CardPickerRender({
    card,
    index,
  }: {
    card: CardType;
    index: number;
  }) {
    return (
      <View style={CurrentStyle.cardCtn}>
        <TouchableOpacity
          onPress={() =>
            card.title ? cardPicked_push(card) : card_create(card, index)
          }
        >
          <View style={CurrentStyle.cardImageCtn}>
            {card.imageUri && (
              <Image
                source={{ uri: card.imageUri }}
                style={CurrentStyle.image}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={CurrentStyle.cardTextCtn}>
          <Text>{card.title}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={CurrentStyle.appCtn}>
      <StatusBar />
      <View style={CurrentStyle.clearBtnCtn}>
        <TouchableOpacity onPress={cardPicked_backspace}>
          <Ionicons name="ios-backspace" size={btn_img_height} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={CurrentStyle.cardPickedCtn}>
        <FlatList
          style={CurrentStyle.cardPickedListCtn}
          data={cardPicked}
          keyExtractor={(item, index) => `0${item.title}${index}`}
          renderItem={({ item, index, separators }) => (
            <CardPickedRender card={item} />
          )}
          horizontal={true}
          contentContainerStyle={CurrentStyle.cardPickedListContentCtn}
        />
      </View>

      <View style={CurrentStyle.cardPickerCtn}>
        <FlatList
          style={CurrentStyle.cardPickerListCtn}
          data={cardPicker}
          keyExtractor={(item, index) => `1${item.title}${index}`}
          renderItem={({ item, index, separators }) => (
            <CardPickerRender card={item} index={index} />
          )}
          numColumns={cardDatabase_numberOfColumn}
          contentContainerStyle={CurrentStyle.cardPickedListContentCtn}
        />
      </View>

      <Modal
        animationType="slide"
        visible={cardCreationVisible}
        onRequestClose={card_deny}
        presentationStyle="pageSheet"
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 64,
            marginHorizontal: 32,
            backgroundColor: "white",
            // height: "100%",
            // width: "100%",
            padding: 12,
            // ...CommonStyle.border,
            // ...CommonStyle.round,
          }}
        >
          {/*  */}
          <View style={CurrentStyle.imageCtn}>
            {imageUri && (
              <Image source={{ uri: imageUri }} style={CurrentStyle.image} />
            )}
          </View>

          <View style={CurrentStyle.textContainer}>
            <TextInput
              style={CurrentStyle.textInput}
              placeholder={"TIÊU ĐỀ"}
              value={text}
              onChangeText={(str) => {
                // setText(str.toUpperCase());
                setText(str);
              }}
              // autoCapitalize={"characters"}
              autoCapitalize={"sentences"}
            ></TextInput>
          </View>

          <TouchableOpacity onPress={image_pickFromLibrary}>
            <View style={CurrentStyle.button}>
              {/* <MaterialIcons
                name="photo-library"
                size={FontSize.h2}
                color="black"
              /> */}
              <Image
                source={require("../../assets/symbol-image-library.png")}
                style={{ height: btn_img_height, width: btn_img_height }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={image_pickFromCamera}>
            <View style={CurrentStyle.button}>
              {/* <MaterialIcons
                name="photo-camera"
                size={FontSize.h2}
                color="black"
              /> */}
              <Image
                source={require("../../assets/symbol-camera.png")}
                style={{ height: btn_img_height, width: btn_img_height }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={sound_recordingToggle}>
            <View
              style={[
                CurrentStyle.button,
                {
                  backgroundColor: recording && "#B9E0FF",
                },
              ]}
            >
              {recording ? (
                // <MaterialIcons name="stop" size={FontSize.h2} color="black" />
                <View
                  style={{
                    position: "absolute",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: btn_img_height,
                      height: btn_img_height,
                      alignSelf: "center",
                      top: btn_img_height / 2,
                    }}
                  >
                    <FontAwesome
                      name="circle"
                      size={btn_img_height}
                      color="#009EFF"
                    />
                  </View>
                  <View
                    style={{
                      width: btn_img_height,
                      height: btn_img_height,
                      alignSelf: "center",
                      bottom: (btn_img_height - window_padding) / 2,
                    }}
                  >
                    <MaterialIcons
                      name="stop"
                      size={btn_img_height - window_padding}
                      color="white"
                    />
                  </View>
                </View>
              ) : (
                // <MaterialIcons
                //   name="fiber-manual-record"
                //   size={FontSize.h2}
                //   color="red"
                // />
                <Image
                  source={require("../../assets/symbol-record.png")}
                  style={{ height: btn_img_height, width: btn_img_height }}
                />
              )}
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={sound_replay}>
            <View style={CurrentStyle.button}>
              <MaterialIcons
                name="play-arrow"
                size={FontSize.h2}
                color="black"
              />
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={card_accept}>
            <View style={CurrentStyle.button}>
              <Text style={{ fontSize: FontSize.h2 }}>XONG</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const CurrentStyle = StyleSheet.create({
  appCtn: {
    flex: 1,
    alignItems: "center",
  },
  clearBtnCtn: {
    marginHorizontal: card_margin,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  cardPickedListContentCtn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  cardPickedCtn: {
    width: window_width - window_padding * 2,
    height: card_height + window_padding,
    flexDirection: "row",
    marginVertical: card_margin,
    ...CommonStyle.round,
  },
  cardPickedListCtn: {
    width: "100%",
    height: "100%",
    ...CommonStyle.border,
    ...CommonStyle.round,
  },
  cardPickerCtn: {
    width: window_width - window_padding * 2,
    height: "70%",
    flexDirection: "column",
    ...CommonStyle.round,
  },
  cardPickerListCtn: {
    width: "100%",
    height: "100%",
    ...CommonStyle.round,
  },
  cardCtn: {
    width: card_width,
    height: card_height,
    margin: card_margin,
    flexDirection: "column",
    justifyContent: "flex-start",
    ...CommonStyle.round,
  },
  cardImageCtn: {
    backgroundColor: "white",
    width: "100%",
    aspectRatio: 1,
    ...CommonStyle.border,
    ...CommonStyle.round,
    ...CommonStyle.center,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardTextCtn: {
    backgroundColor: "white",
    width: "100%",
    height: cardTitle_height,
    ...CommonStyle.border,
    ...CommonStyle.round,
    ...CommonStyle.center,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    ...CommonStyle.round,
  },
  imageCtn: {
    backgroundColor: "white",
    width: window_width - window_padding * 8,
    marginTop: card_margin,
    aspectRatio: 1,
    ...CommonStyle.round,
    ...CommonStyle.center,
    ...CommonStyle.border,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  textContainer: {
    height: cardTitle_height + window_padding,
    marginBottom: card_margin,
    width: window_width - window_padding * 8,
    ...CommonStyle.center,
    ...CommonStyle.round,
    ...CommonStyle.border,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  textInput: {
    fontSize: card_fontSize,
  },
  button: {
    height: btn_img_height,
    // width: window_width - window_padding * 8,
    width: btn_img_height * 2,
    marginVertical: card_margin,
    ...CommonStyle.center,
    ...CommonStyle.border,
    ...CommonStyle.round,
  },
});
