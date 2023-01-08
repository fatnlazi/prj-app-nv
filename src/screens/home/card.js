import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../../styles';
import * as action from '../../redux/action';

export default function CardAreaView({ style, index, atCart: onCart }) {
  const cardArea = useSelector((state) => state.cardArea);
  const catalogue = useSelector((state) => state.catalogue);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function selectOnPress() {
    if (onCart) {
    } else {
      if (catalogue.list[index].text && catalogue.list[index].imageUri) {
        dispatch(action.pushCart(index));
      } else {
        navigation.navigate('CardProps', { index: index });
      }
    }
  }

  return (
    <TouchableOpacity onPress={selectOnPress}>
      <View
        style={[
          style,
          styles.border,
          styles.borderRound,
          {
            width: cardArea.width,
            height: cardArea.height,
            margin: cardArea.margin,
            backgroundColor: '#ffffff',
          },
        ]}
      >
        <View
          style={[
            styles.borderRound,
            {
              width: cardArea.width - 1,
              height: cardArea.width - 1,
              margin: 0,
              padding: 0,
            },
          ]}
        >
          {catalogue.list[index].imageUri ? (
            <Image
              source={{ uri: catalogue.list[index].imageUri }}
              style={[
                // styles.border,
                styles.borderRound,
                {
                  width: cardArea.width - 2,
                  height: cardArea.width - 2,
                  margin: 0,
                  padding: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
            />
          ) : null}
        </View>

        {
          <View
            style={[
              styles.flexColumnCenter,
              styles.borderRound,
              {
                borderTopStartRadius: 0,
                borderTopEndRadius: 0,
                width: cardArea.width,
                height: cardArea.height - cardArea.width,
                margin: 0,
                padding: 0,
              },
            ]}
          >
            {catalogue.list[index].text ? (
              <Text
                style={[
                  {
                    fontSize: cardArea.height - cardArea.width - 8,
                  },
                ]}
              >
                {catalogue.list[index].text}
              </Text>
            ) : null}
          </View>
        }
      </View>
    </TouchableOpacity>
  );
}
