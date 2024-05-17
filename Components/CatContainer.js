import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { PrimaryCats } from './PrimaryCats';
import { CrateAnimations } from './CrateAnimations';

export const CatContainer = ({ timer, crates, setCrates, MaxCrates, setMoney, primaryCats, setPrimaryCats }) => {
    const { width, height } = Dimensions.get('window');
    const addedCrateRef = useRef(false);

    useEffect(() => {
        const addCrate = () => {
            if (!addedCrateRef.current && crates.length + primaryCats.length < MaxCrates) {
                const newCrate = {
                    id: Math.random().toString(),
                    x: Math.floor(Math.random() * (width * 0.80 - 75)),
                    y: Math.floor(Math.random() * (height * 0.55 - 75))
                };
                setCrates(prevCrates => [...prevCrates, newCrate]);
                addedCrateRef.current = true;
            }
        };

        if (timer === 0) {
            addCrate();
        } else {
            addedCrateRef.current = false;
        }
    }, [timer, crates.length, primaryCats.length, MaxCrates, setCrates, width, height]);

    return (
        <View style={CatContainerStyles.container}>
            {crates.length > 0 && crates.map(crate => (
                <CrateAnimations key={crate.id} crate={crate} setCrates={setCrates} setPrimaryCats={setPrimaryCats} />
            ))}
            <PrimaryCats primaryCats={primaryCats} setPrimaryCats={setPrimaryCats} setMoney={setMoney} crates={crates}/>
        </View>
    );
};

export const CatContainerMemoized = React.memo(CatContainer);

const CatContainerStyles = StyleSheet.create({
    container: {
        width: '80%',
        height: '55%',
        borderWidth: 1,
        position: 'absolute',
        bottom: '20%'
    },
});