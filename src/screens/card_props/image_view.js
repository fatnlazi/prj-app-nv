import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function ImageView({ imageUri }) {
  const cardDems = useSelector((state) => state.cardArea);

  const sty = StyleSheet.create({
    ctn: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      borderWidth: 1,
      borderRadius: 12,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: 0,
      width: cardDems.width,
      height: cardDems.width,
      backgroundColor: 'white',
    },
    imgCtn: {
      borderWidth: 0,
      width: cardDems.width - 2,
      height: cardDems.width - 1,
    },
  });

  const ImageArea = ({ uri }) => {
    return <Image style={[sty.ctn, sty.imgCtn]} source={{ uri: uri }} />;
  };

  return (
    <View style={sty.ctn}>
      {imageUri ? <ImageArea uri={imageUri} /> : null}
    </View>
  );
}
