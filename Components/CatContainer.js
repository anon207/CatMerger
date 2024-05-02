import { StyleSheet, Text, View } from 'react-native';

export const CatContainer = () => {
    return(
        <View style={CatContainerStyles.container}>
            
        </View>
    );
}

const CatContainerStyles = StyleSheet.create({
    container: {
        width: '80%',
        height: '55%',
        borderWidth: 1,
        position: 'absolute',
        bottom: '20%'
    },
});