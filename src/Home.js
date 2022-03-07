import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image } from 'react-native';
import { styles } from './Styles/generalStyles';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Comfortaa_400Regular,
} from '@expo-google-fonts/comfortaa';

export default function Home() {

  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={stylesHome.container}>
        <StatusBar backgroundColor='#D3CACA' barStyle='dark-content' />
        <Image
          style={stylesHome.image}
          source={require('../assets/Perfil.png')}
        />
        <Text style={[styles.title, {paddingTop: 20}]}>Antonino Araoz</Text>
        <Text style={[styles.subtitle1, {marginTop: -7}]}>"Nino"</Text>
        <Text style={[styles.subtitle2, {marginTop: 12}]}>Establecido en Salta, AR</Text>
        <Text style={[styles.usuary, {textDecorationLine: 'underline', marginTop: 26}]}>antoninoaraoz@hotmail.com</Text>
      </View>
    );
  }
}

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80
  },
  image: {
    width: '32%',
    height: '21%',
    borderRadius: 100,
    alignItems: 'center',
  },
  name: {
    fontSize: 36,
    letterSpacing: -1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    fontFamily: 'Comfortaa_400Regular'
  },
  nickName: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    fontSize: 15,
    alignItems: 'center',
    paddingVertical: 13
  },
  email: {
    fontSize: 15,
    color: '#D3CACA',
    
    alignItems: 'center',
    paddingVertical: 13
  },
});
