import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { PrimaryCats } from './PrimaryCats';

export const CatContainer = ({ timer, crates, setCrates, MaxCrates }) => {
    const addedCrateRef = useRef(false);
    const [primaryCats, setPrimaryCats] = useState([]);

    const addCrate = () => {
        if (!addedCrateRef.current && crates.length + primaryCats.length < MaxCrates) {
            const newCrate = {
                id: Math.random().toString(),
                x: Math.floor(Math.random() * 200),
                y: Math.floor(Math.random() * 200),
            };
            setCrates(prevCrates => [...prevCrates, newCrate]);
            addedCrateRef.current = true;
        }
    };

    const removeCrateAndAddCat = (crate) => {
        setPrimaryCats(prevCats => [...prevCats, crate]);
        setCrates(prevCrates => prevCrates.filter(oldCrate => oldCrate.id !== crate.id));
    };

    useEffect(() => {
        if (timer === 0) {
            addCrate();
        } else {
            addedCrateRef.current = false;
        }
    }, [timer]);
    
    return (
        <View style={CatContainerStyles.container}>
            {crates.map(crate => (
                <Pressable key={crate.id} onPress={() => removeCrateAndAddCat(crate)}>
                    <Image
                        source={require('../assets/crate.jpg')}
                        style={{ width: 50, height: 50, position: 'absolute', top: crate.y, left: crate.x }}
                    />
                </Pressable>
            ))}
            <PrimaryCats primaryCats={primaryCats} setPrimaryCats={setPrimaryCats} />
        </View>
    );
};

const CatContainerStyles = StyleSheet.create({
    container: {
        width: '80%',
        height: '55%',
        borderWidth: 1,
        position: 'absolute',
        bottom: '20%'
    },
});