import React, { useEffect, useRef, useState } from 'react';
import { Image, Animated, View, Pressable } from 'react-native';

export const CrateAnimations = ({ crate, setCrates, setPrimaryCats }) => {
    const OG = useRef(new Animated.ValueXY({ x: crate.x, y: crate.y })).current;
    const position = useRef(new Animated.ValueXY({ x: crate.x, y: -300 })).current;
    const Xscale = useRef(new Animated.Value(1)).current;
    const Yscale = useRef(new Animated.Value(1)).current;

    const removeCrateAndAddCat = (crate) => {
        setPrimaryCats(prevCats => [...prevCats, { id: crate.id, animatedValue: new Animated.ValueXY({ x: crate.x, y: crate.y }) }]);
        setCrates(prevCrates => prevCrates.filter(oldCrate => oldCrate.id !== crate.id));
    };

    useEffect(() => {
        const Xout = Animated.timing(Xscale, { toValue: 1.5, duration: 250, useNativeDriver: true }, position.current = { x: crate.x, y: crate.y });
        const Xin = Animated.timing(Xscale, { toValue: 1, duration: 250, useNativeDriver: true });
        const Yout = Animated.timing(Yscale, { toValue: 0.75, duration: 250, useNativeDriver: true });
        const Yin = Animated.timing(Yscale, { toValue: 1, duration: 250, useNativeDriver: true });
        const Yup = Animated.sequence([Animated.delay(110), Animated.timing(OG, { toValue: { x: crate.x, y: crate.y - 37.5 }, duration: 250, useNativeDriver: true })]);
        const YDown = Animated.timing(OG, { toValue: { x: crate.x, y: crate.y }, duration: 250, useNativeDriver: true });
    
        const OutStretch = Animated.parallel([Xout, Yout]);
        const InStretch = Animated.parallel([Xin, Yin]);
        const UP = Animated.parallel([InStretch, Yup]);

        const loopAnimation = Animated.loop(
            Animated.sequence([
                OutStretch,
                UP,
                YDown,
                Animated.delay(4000),
            ]),
        );
    
        const animateCrate = () => {
            Animated.sequence([
                Animated.timing(position, {
                    toValue: { x: crate.x, y: crate.y },
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(4000),
                Animated.loop(
                    Animated.sequence([
                        OutStretch,
                        UP,
                        YDown,
                        Animated.delay(4000),
                    ]),
                ),
            ]).start();
        };
    
        animateCrate();
    
        Animated.sequence([
            Animated.delay(490),
            Animated.timing(Xscale, {
                toValue: 2,
                duration: 150,
                useNativeDriver: true
            }), 
            Animated.timing(Xscale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true
            }), 
        ]).start();
    
        Animated.sequence([
            Animated.delay(490),
            Animated.timing(Yscale, {
                toValue: .7,
                duration: 150,
                useNativeDriver: true
            }), 
            Animated.timing(Yscale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true
            }), 
        ]).start();
    }, [crate]);

    return (
            <Animated.View
                style={{
                    position: 'absolute',
                    left: crate.x,
                    transform: [
                        { translateY: position.y._value === crate.y ? OG.y : position.y },
                        { scaleX: Xscale },
                        { scaleY: Yscale }],
                }}
            >
                <Pressable onPress={() => removeCrateAndAddCat(crate)}>
                    <Image
                        source={require('../assets/Crates/GreenWhiteCrate.png')}
                        style={{ width: 75, height: 75 }}
                    />
                </Pressable>
            </Animated.View>
    );
};