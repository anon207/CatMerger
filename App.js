import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { MoneyBar } from './Components/MoneyBar';
import { UpgradeBar } from './Components/UpgradeBar';
import { CatContainer } from './Components/CatContainer';


export default function App() {
  const initialTimePerCrate = 3;
  const [primaryCats, setPrimaryCats] = useState([]);
  const [timer, setTimer] = useState(initialTimePerCrate);
  const [crates, setCrates] = useState([]);
  const [money, setMoney] = useState(0);
  const MaxCrates = 3;

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
