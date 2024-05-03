import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { MoneyBar } from './Components/MoneyBar';
import { UpgradeBar } from './Components/UpgradeBar';
import { CatContainer } from './Components/CatContainer';


export default function App() {
  const initialTimePerCrate = 5;
  const [timer, setTimer] = useState(initialTimePerCrate);
  const [crates, setCrates] = useState([]);
  const MaxCrates = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          return(initialTimePerCrate);
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MoneyBar timer={timer} crates={crates} setCrates={setCrates} MaxCrates={MaxCrates}/>
      <CatContainer timer={timer} crates={crates} setCrates={setCrates} MaxCrates={MaxCrates}/>
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
