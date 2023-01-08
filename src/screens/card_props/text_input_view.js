import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function TextInputView() {
  const cardDems = useSelector((state) => state.cardArea);
  const [curTxt, setCurTxt] = useState('');
  const txtRef = useRef('');

  console.log('re-rendering...');

  useEffect(() => {
    console.log(txtRef.current);
  });

  const sty = StyleSheet.create({
    ctn: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 12,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      width: cardDems.width,
      height: cardDems.height - cardDems.width,
      marginBottom: cardDems.margin,
      backgroundColor: 'white',
    },
    txtCtn: {
      fontSize: cardDems.height - cardDems.width - 8,
    },
  });

  return (
    <View style={sty.ctn}>
      <TextInput
        ref={txtRef}
        style={sty.txtCtn}
        placeholder={'TIÊU ĐỀ'}
        // value={curTxt}
        onSubmitEditing={(e) => {
          txtRef.current.focus();
          txtRef.current = e.nativeEvent.text;
          setCurTxt(txtRef.current);
          console.log(e.nativeEvent.text, 'done editing...');
        }}
        autoCapitalize={'sentences'}
      />
    </View>
  );
}
