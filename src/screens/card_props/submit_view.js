import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function SubmitView({ onPress }) {
  const cardDems = useSelector((state) => state.cardArea);

  const sty = StyleSheet.create({
    ctn: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 12,
      width: cardDems.width,
      height: cardDems.height - cardDems.width,
      marginVertical: cardDems.margin,
    },
    txtCtn: {
      fontSize: cardDems.height - cardDems.width - 8,
      color: 'black',
    },
  });

  const TextArea = () => {
    return <Text style={sty.txtCtn}>{'XONG'}</Text>;
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={sty.ctn}>
        <TextArea />
      </View>
    </TouchableOpacity>
  );
}
