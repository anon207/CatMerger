import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';

export const MoneyBar = ({ timer, money, primaryCats }) => {
    const [moneyPerSecond, setMoneyPerSecond] = useState(0);

    useEffect(() => {
        setMoneyPerSecond(primaryCats.length * 0.5);
    }, [primaryCats]);

    return (
        <View style={MoneyBarStyles.container}>
            <View style={MoneyBarStyles.moneyDisplay}>
                <Image
                    source={require('../assets/MyCatCoin.png')}
                    style={{ width: 30, height: 30 }}
                />
                <Text style={MoneyBarStyles.moneyText}>{money}</Text>
            </View>
            <View>
                <Text style={MoneyBarStyles.moneyPerSecond}>
                    <Text style={MoneyBarStyles.moneyPerSecondValue}>{moneyPerSecond}</Text>
                    <Text style={MoneyBarStyles.moneyPerSecondText}> coins/sec</Text>
                </Text>
            </View>
            <Animated.View>
                <Text style={MoneyBarStyles.timerText}>{timer}</Text>
                <Image
                    source={require('../assets/Crates/GreenWhiteCrate.png')}
                    style={MoneyBarStyles.crate}
                />
            </Animated.View>
        </View>
    );
};

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
    moneyText: {
        fontSize: 24,
        fontFamily: 'ComicSans',
    },
    moneyPerSecond: {
        fontFamily: 'ComicSans',
    },
    moneyPerSecondValue: {
        fontFamily: 'ComicSans',
    },
    moneyPerSecondText: {
        fontFamily: 'KiddosyRegular',
    },
    crate: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 150,
        bottom: 8,
    },
    timerText: {
        position: 'absolute',
        left: 160,
        bottom: 35,
        fontFamily: 'ComicSans',
    },
});