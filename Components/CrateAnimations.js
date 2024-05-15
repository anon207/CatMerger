import React, { useEffect, useRef } from 'react';
import { Image, Animated, View, Pressable } from 'react-native';

export const CrateAnimations = ({ crate, setCrates, setPrimaryCats }) => {
    const position = useRef(new Animated.ValueXY({ x: crate.x, y: -300 })).current;

    const removeCrateAndAddCat = (crate) => {
        setPrimaryCats(prevCats => [...prevCats, { id: crate.id, animatedValue: new Animated.ValueXY({ x: crate.x, y: crate.y }) }]);
        setCrates(prevCrates => prevCrates.filter(oldCrate => oldCrate.id !== crate.id));
    };

    useEffect(() => {
        Animated.timing(position, {
            toValue: { x: crate.x, y: crate.y },
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [crate]);

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: crate.x,
                transform: [{ translateY: position.y }],
            }}
        >
            <Pressable onPress={() => removeCrateAndAddCat(crate)}>
                <Image
                    source={require('../assets/Crates/GreenWhiteCrate.png')}
                    style={{ width: 50, height: 50 }}
                />
            </Pressable>
        </Animated.View>
    );
};