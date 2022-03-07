import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './src/Home'
import CommodityPrice from './src/CommodityPrice';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Comfortaa_400Regular,
} from '@expo-google-fonts/comfortaa';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';


const Drawer = createDrawerNavigator();

const ArrowClose = () => {
  return (
    <View style={stylesDrawer.arrow}>
      <TouchableOpacity>
        <Ionicons name="arrow-back" size={25} />
      </TouchableOpacity>
    </View>
  )
}
function CustonDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={ArrowClose}
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

function MyCloseDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustonDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#D3CACA',
        },
        drawerStyle: {
          backgroundColor: '#D3CACA',
        },
        drawerInactiveBackgroundColor: {
          backgroundColor: '#D3CACA',
        },
        drawerActiveBackgroundColor: {
          backgroundColor: '#D3CACA',
        },
        drawerItemStyle: {
          backgroundColor: '#D3CACA',
        },
        overlayColor: 170,

      }}
      backBehavior='history'
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "",

          drawerItemStyle: {
            marginTop: 60,
            backgroundColor: '#D3CACA',
          },
          drawerLabelStyle: {
            fontFamily: 'Comfortaa_400Regular',
            fontSize: 18,
            letterSpacing: -1.5,
            lineHeight: 20.07,
          },
        }} />
      <Drawer.Screen
        name="Cotización períodos"
        component={CommodityPrice}
        options={{
          headerTitle: "",
          drawerLabelStyle: {
            fontFamily: 'Comfortaa_400Regular',
            fontSize: 18,
            letterSpacing: -1.5,
            lineHeight: 20.07,
          },
        }} />
    </Drawer.Navigator>
  );
}

export default function App() {

  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MyCloseDrawer />
        </NavigationContainer>
      </Provider>
    );
  };
}

const stylesDrawer = StyleSheet.create({
  arrow: {
    alignItems: 'flex-end'
  },
})