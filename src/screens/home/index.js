import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import SafeAreaView from '../../components/safe_area/view';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from '../../styles';
import * as action from '../../redux/action';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CardAreaView from './card';

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

  function onPressPopCart() {
    dispatch(action.popCart());
  }

  return (
    <TouchableOpacity onPress={onPressPopCart}>
      <View
        style={[
          style,
          styles.border,
          styles.borderRound,
          {
            width: toolArea.height * 2,
            height: toolArea.height,
            // backgroundColor: '#e6e6e6',
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
          backgroundColor: '#e6e6e6',
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
          backgroundColor: '#e6e6e6',
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
