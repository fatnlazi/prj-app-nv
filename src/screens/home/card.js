import { Image, TouchableOpacity } from 'react-native';

function ImageAreaView({ style }) {
  <Image />;
}

function TextAreaView({ style, text }) {
  <View>
    <Text>{text || ''}</Text>
  </View>;
}

export default function CardAreaView({ style, index, onPress }) {
  const cardArea = useSelector((state) => state.cardArea);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          style,
          // styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.height,
            margin: cardArea.margin,
            backgroundColor: '#ffffff',
          },
        ]}
      >
        <ImageAreaView />
        <TextAreaView />
      </View>
    </TouchableOpacity>
  );
}
