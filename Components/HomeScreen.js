import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { MoneyBar } from './MoneyBar';
import { UpgradeBar } from './UpgradeBar';
import { CatContainer } from './CatContainer';

export function HomeScreen() {
  const initialTimePerCrate = 1;
  const [primaryCats, setPrimaryCats] = useState([]);
  const [timer, setTimer] = useState(initialTimePerCrate);
  const [crates, setCrates] = useState([]);
  const [money, setMoney] = useState(3000);
  const MaxCrates = 10;

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
      <MoneyBar timer={timer} crates={crates} setCrates={setCrates} MaxCrates={MaxCrates} money={money} setMoney={setMoney} primaryCats={primaryCats} setPrimaryCats={setPrimaryCats}/>
      <CatContainer timer={timer} crates={crates} setCrates={setCrates} MaxCrates={MaxCrates} setMoney={setMoney} primaryCats={primaryCats} setPrimaryCats={setPrimaryCats}/>
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