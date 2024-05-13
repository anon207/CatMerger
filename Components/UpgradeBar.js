import { StyleSheet, Text, View } from 'react-native';

export const UpgradeBar = () => {
    return(
        <View style={UpgradeBarStyles.container}>
            <View style={UpgradeBarStyles.upgrades}>
                <Text style={{fontSize: 13, fontFamily: 'KiddosyRegular'}}>Upgrades</Text>
            </View>
            <View style={UpgradeBarStyles.catShop}>
                <Text style={{fontSize: 14, fontFamily: 'KiddosyRegular'}}>Cat shop</Text>
            </View>
            <View style={UpgradeBarStyles.menu}>
                <Text style={{fontSize: 20, fontFamily: 'KiddosyRegular'}}>Menu</Text>
            </View>
        </View>
    );
}

const UpgradeBarStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '12%', 
        backgroundColor: 'lightgrey',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    upgrades: {
        width: 65,
        height: 65,
        backgroundColor: 'red',
        position: 'absolute',
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    catShop: {
        width: 65,
        height: 65,
        backgroundColor: 'red',
        position: 'absolute',
        top: 10,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        width: 65,
        height: 65,
        backgroundColor: 'red',
        position: 'absolute',
        top: 10,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});