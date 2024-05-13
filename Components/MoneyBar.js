import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';

export const MoneyBar = ({ timer, crates, setCrates, MaxCrates, money, setMoney, primaryCats, setPrimaryCats }) => {
    const [moneyPerSecond, setMoneyPerSecond] = useState(0);

    useEffect(() => {
        setMoneyPerSecond(primaryCats.length*.5);
    }, [primaryCats]);

    return(
        <View style={MoneyBarStyles.container}>
                <View style={MoneyBarStyles.moneyDisplay}>
                        <Image
                            source={require('../assets/cat_coin.jpg')}
                            style={{ width: 25, height: 25 }}
                        />
                    <Text style={{fontSize: 24, fontFamily: 'ComicSans'}}> {money}</Text>
                </View>
                <View>
                    <Text>
                        <Text style={{fontFamily: 'ComicSans'}}>{moneyPerSecond}</Text>
                        <Text style={{fontFamily: 'KiddosyRegular'}}> coins/sec</Text>
                    </Text>
                </View>
                <Animated.View>
                    <Text style={{position: 'absolute', left: 160, bottom: 35, fontFamily: 'ComicSans'}}>{timer}</Text>
                    <Image
                    source={require('../assets/crate.jpg')}
                    style={MoneyBarStyles.crate}
                    />
                </Animated.View>
        </View>
        
    );
}

const MoneyBarStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '13.5%', 
        backgroundColor: 'lightgrey',
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moneyDisplay: {
        marginTop: 20,
        width: '40%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    crateDisplay: {
        position: 'absolute',
        right: 10,
        bottom: 5
    },
    crate: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 150,
        bottom: 8
    },
});