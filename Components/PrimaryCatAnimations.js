import React, { useEffect, useRef } from 'react';
import { Image, Animated, Text, View, StyleSheet } from 'react-native';

export const PrimaryCatAnimations = ({ primaryCat, setPrimaryCats, dxValue, setMoney }) => {
    useEffect(() => {
        const spawnInterval = setInterval(() => {
            const spawnedObjectPosition = new Animated.ValueXY({ x: 0, y: 0 });
            const opacity = new Animated.Value(1);

            Animated.sequence([
                Animated.timing(spawnedObjectPosition, {
                    toValue: dxValue > 0 ? { x: 75, y: 15 } : { x: -75, y: 15 },
                    duration: 700,
                    useNativeDriver: true
                }),
                Animated.delay(200),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start(() => {
                setTimeout(() => {
                    setPrimaryCats(prevCats => prevCats.map(cat =>
                        cat.id === primaryCat.id ? { ...cat, spawnedObject: null } : cat
                    ));
                    startTextAnimation();
                }, 100);
            });

            const basicYarn = (
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: primaryCat.animatedValue.y._value + 24.5,
                        left: dxValue > 0 ? primaryCat.animatedValue.x._value : primaryCat.animatedValue.x._value + 25,
                        transform: [{ translateX: spawnedObjectPosition.x }, { translateY: spawnedObjectPosition.y }],
                        opacity: opacity
                    }}
                    key={`${primaryCat.id}-${Date.now()}`}
                >
                    <Image
                        source={require('../assets/Yarn/Red_Yarn.png')}
                        style={{ width: 25, height: 25 }}
                    />
                </Animated.View>
            );

            setPrimaryCats(prevCats => prevCats.map(cat =>
                cat.id === primaryCat.id ? { ...cat, spawnedObject: basicYarn } : cat
            ));
        }, 2000);

        return () => clearInterval(spawnInterval);
    }, [primaryCat, setPrimaryCats, dxValue]);

    const startTextAnimation = () => {
        const textPosition = new Animated.ValueXY({ x: 0, y: 0 });
        const textOpacity = new Animated.Value(0);
        const textScale = new Animated.Value(0);

        Animated.timing(textScale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false
        }).start();
        Animated.sequence([
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(textPosition, {
                toValue: { x: 0, y: -25 },
                duration: 800,
                useNativeDriver: false
            }, setMoney(n => n + 1)),
            Animated.delay(100),
            Animated.timing(textOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            })
        ]).start(() => {
            setPrimaryCats(prevCats => prevCats.map(cat =>
                cat.id === primaryCat.id ? { ...cat, spawnedObject: null } : cat
            ));
        });

        const plusOne = (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: primaryCat.animatedValue.y._value + 5,
                    left: dxValue > 0 ? primaryCat.animatedValue.x._value + 75 : primaryCat.animatedValue.x._value - 50,
                    transform: [{ translateX: textPosition.x }, { translateY: textPosition.y }, { scale: textScale }],
                    opacity: textOpacity,
                }}
            >
                <View style={AnimationStyles.coinStyle}>
                    <Image
                        source={require('../assets/MyCatCoin.png')}
                        style={{ width: 27.5, height: 27.5 }}
                    />
                    <View style={AnimationStyles.coinText}>
                        <Text style={{ fontSize: 15, fontFamily: 'ComicSans' }}>+1</Text>
                    </View>
                </View>
            </Animated.View>
        );

        setPrimaryCats(prevCats => prevCats.map(cat =>
            cat.id === primaryCat.id ? { ...cat, spawnedObject: plusOne } : cat
        ));
    };

    return (
        <>
            {primaryCat.spawnedObject}
        </>
    );
};

export const PrimaryCatAnimationsMemoized = React.memo(PrimaryCatAnimations);

const AnimationStyles = StyleSheet.create({
    coinStyle: {
        width: 50,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    coinText: {
        position: 'absolute',
        right: 5,
        top: 5
    },
});