import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Pressable, Image, PanResponder, Animated } from 'react-native';

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

    const removeCrate = (idToRemove, x, y) => {
        setPrimaryCats(prevCrates => [...prevCrates, { id: idToRemove, x, y }]);
        setCrates(prevCrates => prevCrates.filter(crate => crate.id !== idToRemove));
    };

    useEffect(() => {
        if (timer === 0) {
            addCrate();
        } else {
            addedCrateRef.current = false; // Reset the flag when timer is not 0
        }
    }, [timer]);

    const panResponders = useRef({}).current;

    const createPanResponder = (id) => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: panResponders[id]?.x, dy: panResponders[id]?.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                // Don't reset the pan gesture
            }
        });
    };

    useEffect(() => {
        primaryCats.forEach(crate => {
            if (!panResponders[crate.id]) {
                panResponders[crate.id] = createPanResponder(crate.id);
                panResponders[crate.id].x = new Animated.Value(0);
                panResponders[crate.id].y = new Animated.Value(0);
            }
        });
    }, [primaryCats]);

    return (
        <View style={CatContainerStyles.container}>
            {crates.map(crate => (
                <Pressable key={crate.id} onPress={() => removeCrate(crate.id, crate.x, crate.y)}>
                    <Image
                        source={require('../assets/crate.jpg')}
                        style={{ width: 50, height: 50, position: 'absolute', top: crate.y, left: crate.x }}
                    />
                </Pressable>
            ))}
            {primaryCats.map((primaryCat) => (
                <Animated.View
                    key={primaryCat.id}
                    style={[
                        { position: 'absolute', top: primaryCat.y, left: primaryCat.x },
                        panResponders[primaryCat.id]?.panHandlers?.move?.getLayout()
                    ]}
                >
                    <Image
                        source={require('../assets/Test_cat1.jpg')}
                        style={{ width: 50, height: 50 }}
                    />
                </Animated.View>
            ))}
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