import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MoneyBar } from './Components/MoneyBar';
import { UpgradeBar } from './Components/UpgradeBar';
import { CatContainer } from './Components/CatContainer';


export default function App() {
  return (
    <View style={styles.container}>
      <MoneyBar />
      <CatContainer />
      <UpgradeBar />
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
