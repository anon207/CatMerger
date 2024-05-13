import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './Components/HomeScreen';
import { useFonts } from 'expo-font';
import { Menu } from './Components/Menu';

export default function App() {
  const [fontsLoaded] = useFonts({
    'KiddosyRegular': require('./assets/Kiddosy Regular.ttf'),
    'ComicSans': require('./assets/Ldfcomicsansbold-zgma.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={styles.navigationStyles}>
          <Stack.Screen name="Homescreen" component={HomeScreen}/>
          <Stack.Screen name="Menu" component={Menu}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigationStyles: {
    headerShown: false,
  },
});
