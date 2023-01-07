import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import SafeAreaView from '../../components/safe_area/view';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../../styles';
import * as action from '../../redux/action';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as onPress from './on_press';
import { useNavigation } from '@react-navigation/native';

function CardAreaView({ style, index, atCart: onCart }) {
  const cardArea = useSelector((state) => state.cardArea);
  const catalogue = useSelector((state) => state.catalogue);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function selectOnPress() {
    if (onCart) {
    } else {
      if (catalogue.list[index].text && catalogue.list[index].imageUri) {
        dispatch(action.pushCart());
      } else {
        navigation.navigate('CardProps');
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
                styles.border,
                styles.borderRound,
                {
                  width: cardArea.width,
                  height: cardArea.width,
                  margin: 0,
                  padding: 0,
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
                    fontSize: cardArea.height - cardArea.width,
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

function ToolAreaView({ style, children }) {
  const toolArea = useSelector((state) => state.toolArea);

  return (
    <View
      style={[
        style,
        // styles.border,
        styles.borderRound,
        {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: toolArea.width,
          height: toolArea.height,
          margin: toolArea.margin,
        },
      ]}
    >
      {children}
    </View>
  );
}

function BackSpaceButton({ style }) {
  const toolArea = useSelector((state) => state.toolArea);
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={() => onPress.popCart(dispatch)}>
      <View
        style={[
          styles.border,
          styles.borderRound,
          {
            width: toolArea.height * 2,
            height: toolArea.height,
            // backgroundColor: '#999999',
          },
        ]}
      >
        <MaterialCommunityIcons
          style={{ alignSelf: 'center' }}
          name="keyboard-backspace"
          size={toolArea.height}
          // color="#ffffff"
        />
      </View>
    </TouchableOpacity>
  );
}

function CartAreaView({ style, children }) {
  const cartArea = useSelector((state) => state.cartArea);

  return (
    <View
      style={[
        style,
        // styles.border,
        styles.borderRound,
        {
          flexDirection: 'row',
          width: cartArea.width,
          height: cartArea.height,
          margin: cartArea.margin,
          // backgroundColor: '#999999',
        },
      ]}
    >
      {children}
    </View>
  );
}

function CatalogueAreaView({ style, children }) {
  const catalogueArea = useSelector((state) => state.catalogueArea);

  return (
    <View
      style={[
        style,
        // styles.border,
        styles.borderRound,
        {
          width: catalogueArea.width,
          height: catalogueArea.height,
          margin: catalogueArea.margin,
          // backgroundColor: '#999999',
        },
      ]}
    >
      {children}
    </View>
  );
}

function CartFlatList({ style }) {
  const cartArea = useSelector((state) => state.cartArea);
  const cartList = useSelector((state) => state.cart.list);

  return (
    <FlatList
      style={[
        style,
        {
          width: cartArea.width,
          height: cartArea.height,
          padding: cartArea.padding,
        },
      ]}
      data={cartList}
      renderItem={({ item, index }) => {
        return <CardAreaView index={index} onCart={true} />;
      }}
      keyExtractor={(item, index) => `cart_${index}`}
      initialNumToRender={4}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      w
    />
  );
}

function CatalogueFlatList({ style }) {
  const catalogueArea = useSelector((state) => state.catalogueArea);
  const catalogueList = useSelector((state) => state.catalogue.list);

  const numOfColumns = 3;

  return (
    <FlatList
      style={[
        style,
        {
          width: catalogueArea.width,
          height: catalogueArea.height,
          padding: catalogueArea.padding,
        },
      ]}
      data={catalogueList}
      renderItem={({ item, index }) => {
        return <CardAreaView index={index} onCart={false} />;
      }}
      keyExtractor={(item, index) => `catalogue_${index}`}
      numColumns={numOfColumns}
      initialNumToRender={10}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={false}
    />
  );
}

export default function HomeScreen() {
  const dispatch = useDispatch();
  const padding = 4;

  const onLayout = (event) => {
    let width_safe = event.nativeEvent.layout.width;
    let height_safe = event.nativeEvent.layout.height;

    const min_width_card = 130;
    const column_catalogue = Math.floor(width_safe / min_width_card);

    dispatch(action.setSafeAreaViewWidth(width_safe));
    dispatch(action.setSafeAreaViewHeight(height_safe));
    dispatch(action.setSafeAreaViewPadding(padding));

    const width_card =
      (width_safe - (column_catalogue + 1) * padding * 2) / column_catalogue;
    const height_card = width_card * 1.25;
    dispatch(action.setCardAreaViewWidth(width_card));
    dispatch(action.setCardAreaViewHeight(height_card));
    dispatch(action.setCardAreaViewMargin(padding));

    const height_tool = height_card / 4 + padding * 2;
    dispatch(action.setToolAreaViewWidth(width_safe));
    dispatch(action.setToolAreaViewHeight(height_tool));
    dispatch(action.setToolAreaViewMargin(padding));

    const height_cart = height_card + padding * 4;
    dispatch(action.setCartAreaViewWidth(width_safe));
    dispatch(action.setCartAreaViewHeight(height_cart));
    dispatch(action.setCartAreaViewMargin(padding));
    dispatch(action.setCartAreaViewPadding(padding));

    const height_catalogue = height_safe - height_tool - height_cart;
    dispatch(action.setCatalogueAreaViewWidth(width_safe));
    dispatch(action.setCatalogueAreaViewHeight(height_catalogue));
    dispatch(action.setCatalogueAreaViewMargin(padding));
    dispatch(action.setCatalogueAreaViewPadding(padding));
    dispatch(action.setCatalogueAreaViewNumOfColumns(column_catalogue));
  };

  return (
    <SafeAreaView style={{ padding: padding * 2 }} onLayout={onLayout}>
      <ToolAreaView>
        <BackSpaceButton />
      </ToolAreaView>

      <CartAreaView>
        <CartFlatList />
      </CartAreaView>

      <CatalogueAreaView>
        <CatalogueFlatList />
      </CatalogueAreaView>
    </SafeAreaView>
  );
}
