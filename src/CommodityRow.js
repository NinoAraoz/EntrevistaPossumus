import * as React from 'react';
import { Text, View, LogBox, FlatList, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';



LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);



const Item = ({ commodity }) =>
    <View style={commodityRowStyle.mainItemFlatList}>
        <Text style={commodityRowStyle.titleFlatList}>{commodity.date}</Text>
        <Text style={commodityRowStyle.titleFlatList}>USD {Math.round((commodity.price + Number.EPSILON) * 100) / 100}</Text>
    </View>
    ;



export default function CommodityRow(props) {
    const { priceData, commodityName } = props;
    const [toggleStatus, setToggleStatus] = React.useState(true);

    let [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });

    const renderItem = ({ item }) =>
        <Item commodity={item} />
        ;

    const onToggleStatus = () => {
        setToggleStatus(!toggleStatus);
    }
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={commodityRowStyle.commodityRowBox}>
                <View style={commodityRowStyle.commodityBoxTitle}>
                    <Text style={commodityRowStyle.commodityTitle}>
                        {commodityName}
                    </Text>
                    <View style={commodityRowStyle.commodityToogle}>
                        <TouchableOpacity onPress={onToggleStatus}>
                            <Ionicons name={toggleStatus ? "chevron-up" : "chevron-down"} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                {toggleStatus &&
                    <View style={commodityRowStyle.mainrow}>
                        <View style={commodityRowStyle.titleYearPrice}>
                            <Text style={commodityRowStyle.year}>Year</Text>
                            <Text style={commodityRowStyle.year}>Price</Text>
                        </View>
                        <View style={commodityRowStyle.yearPrice}>
                            <FlatList
                                data={priceData.sort((a, b) => a.date.localeCompare(b.date))}
                                renderItem={renderItem}
                                keyExtractor={item => item.recordid}
                            />
                        </View>
                    </View>
                }
            </View>
        );
    };
};

const commodityRowStyle = StyleSheet.create({

    mainrow: {
        flexDirection: "column",
        width: '100%',
        padding: 5,
    },
    titleFlatList: {
        fontSize: 18,
        justifyContent: 'center',

    },
    commodityRowBox: {
        width: '100%',
        height: 'auto',
        borderColor: '#fff',
        borderWidth: 1,
    },
    commodityBoxTitle: {
        flexDirection: 'row',
        width: '100%',
        height: 49,
        backgroundColor: '#DCDBDB',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    commodityTitle: {
        fontSize: 24,
        letterSpacing: -1.5,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'center',
        paddingLeft: 40,
    },
    commodityToogle: {
        justifyContent: 'center',
        alignContent: 'flex-end',
        fontSize: 25,
        paddingRight: 30
    },
    titleYearPrice: {
        flexDirection: 'row',
        fontSize: 18,
        letterSpacing: -1.5,
        lineHeight: 20.7,
        fontFamily: 'Comfortaa_400Regular',
        justifyContent: 'space-around',
        paddingLeft: 5,
    },
    yearPrice: {
        justifyContent: 'center',
        fontFamily: 'Comfortaa_400Regular',
        fontSize: 18,
        paddingLeft: 5,
    },
    mainItemFlatList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 3,
        paddingLeft: 5,
    },
    year: {
        fontSize: 18,
        letterSpacing: -1.5,
        lineHeight: 20.7,
        fontFamily: 'Comfortaa_400Regular',
        justifyContent: 'space-around',
        paddingLeft: 5,
    },
});
