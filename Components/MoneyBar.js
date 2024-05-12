import { StyleSheet, Text, View } from 'react-native';

export const MoneyBar = ({ timer, crates, setCrates, MaxCrates, money, setMoney }) => {
    return(
        <View style={MoneyBarStyles.container}>
            <View style={MoneyBarStyles.moneyDisplay}>
                <Text style={{fontSize: 24}}>money: {money}</Text>
            </View>
            <View style={MoneyBarStyles.crateDisplay}>
                <Text>Time till next crate: {crates.length !== MaxCrates ? timer : 'FULL'}</Text>
                <Text>Crates: {crates.length}</Text>
                <Text>MaxCrates: {MaxCrates}</Text>
            </View>
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
        width: '50%',
        height: '30%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    crateDisplay: {
        position: 'absolute',
        right: 10,
        bottom: 5
    },
});