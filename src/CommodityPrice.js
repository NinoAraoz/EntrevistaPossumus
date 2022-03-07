import * as React from 'react';
import { StyleSheet, View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CommodityRow from './CommodityRow';
import { styles } from './Styles/generalStyles';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Comfortaa_400Regular,
} from '@expo-google-fonts/comfortaa';
import { useSelector, useDispatch } from 'react-redux';
import { getCommodityData, cleanCommodityData } from './Redux/actions';



export default function CommodityPrice() {

  const { commodityPrices } = useSelector(state =>  state.commodityReducer);
  const dispatch = useDispatch();


  const [startYear, setStartYear] = React.useState([]);
  const [endYear, setEndYear] = React.useState([]);
  const data = data;


  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
  });

  async function fetchData() {

    
    const errorMessage = 'The search period can only be between the years 1963 and 2016';

    if (startYear <= 1963 || startYear >= 2016 || endYear <= 1963 || endYear >= 2016) {
      alert(errorMessage);
      return;
    }

    if (endYear < startYear) {
      alert('The end year cannot be greater than the start year');
      return;
    }
    
    let year = startYear;
    dispatch(cleanCommodityData());
    while (year <= endYear) {
      dispatch(getCommodityData(year));
      year++;

    }
  };

  const renderItem = ({ item }) => {
    return <CommodityRow
      commodityName={item}
      priceData={commodityPrices[item]}
    />
  }
    ;

  const displayCommodities = () => {
    const commodityKeys = Object.keys(commodityPrices);
    return (
      <FlatList
        data={commodityKeys}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    );
  };


  if (!fontsLoaded) {
    return <AppLoading/>;
  } else {
    return (
      <View style={stylesComodity.container}>
        <StatusBar backgroundColor='#D3CACA' barStyle='dark-content' />
        <View>
          <Text style={[styles.title, { paddingTop: 45 }]}>Commodity Price</Text>
          <Text style={styles.subtitle1}>Period</Text>
        </View>
        <View style={stylesComodity.containerSearchBox}>
          <View style={stylesComodity.containerStarEnd}>
            <Text style={[styles.subtitle2, { marginVertical: 6 }]}>Start</Text>
            <Text style={styles.subtitle2}>End</Text>
          </View>
          <View style={stylesComodity.containerTextInputYear}>
            <TextInput
              style={stylesComodity.periodInput}
              keyboardType='numeric'
              onChangeText={setStartYear}
            />
            <TextInput
              style={stylesComodity.periodInput}
              keyboardType='numeric'
              onChangeText={setEndYear}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={stylesComodity.button}
            onPress={fetchData}>
            <Text style={stylesComodity.textButton}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={stylesComodity.commodityBox}>
          {displayCommodities()}
        </View>
        <Text style={styles.usuary}>Antonino Araoz - 2022</Text>
      </View>
    );
  };
}



const stylesComodity = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  containerSearchBox: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  containerStarEnd: {
    flexDirection: 'column',
    paddingVertical: 5,
    alignItems: 'center',
    marginLeft: -40,
    paddingRight: 13
  },
  containerTextInputYear: {
    flexDirection: 'column',
    width: '20%',
    paddingVertical: 5,
  },
  textPeriod: {
    fontSize: 18,
    letterSpacing: -1.5,
    lineHeight: 20.7,
    textAlign: 'center',
    paddingVertical: 5,
    marginHorizontal: 5,
    fontFamily: 'Comfortaa_400Regular'
  },
  periodInput: {
    width: '100%',
    height: 26,
    letterSpacing: -1.5,
    borderWidth: 1,
    borderColor: 'grey',
    paddingBottom: 2,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Comfortaa_400Regular',
    marginVertical: 6
  },
  commodityBox: {
    flex: 2,
    width: '100%',
    height: "auto",
    paddingVertical: 5,
  },
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: "#D3CACA",
    paddingHorizontal: 35,
    padding: 10,
    elevation: 5,
    marginVertical: 12,
  },
  textButton: {
    fontSize: 18,
    fontFamily: 'Comfortaa_400Regular',
  },

});