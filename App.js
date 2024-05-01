import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MoneyBar } from './Components/MoneyBar';
import { UpgradeBar } from './Components/UpgradeBar';



export default function App() {
  return (
    <View style={styles.container}>
      <MoneyBar />
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
