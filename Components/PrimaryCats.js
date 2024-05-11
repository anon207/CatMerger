import React, { useEffect, useRef } from 'react';
import { Image, PanResponder, Animated, Dimensions, View, Text } from 'react-native';

export const PrimaryCats = ({ primaryCats, setPrimaryCats }) => {
    const panRespondersRef = useRef([]);
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        const spawnIntervals = primaryCats.map(primaryCat => {
            return setInterval(() => {
                const spawnedObjectPosition = new Animated.ValueXY({ x: 0, y: 0 });

                Animated.timing(spawnedObjectPosition, {
                    toValue: { x: 75, y: 15 },
                    duration: 800,
                    useNativeDriver: false
                }).start(() => {
                    setTimeout(() => {
                        setPrimaryCats(prevCats => {
                            const updatedCats = prevCats.map(cat =>
                                cat.id === primaryCat.id ? { ...cat, spawnedObject: null } : cat
                            );
                            return updatedCats;
                        });
                        startTextAnimation(primaryCat);
                    }, 800);
                });

                const basicYarn = (
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: primaryCat.animatedValue.y._value + 12.5,
                            left: primaryCat.animatedValue.x._value,
                            transform: [{ translateX: spawnedObjectPosition.x }, { translateY: spawnedObjectPosition.y }]
                        }}
                        key={`${primaryCat.id}-${Date.now()}`}
                    >
                        <Image
                            source={require('../assets/redYarn.jpg')}
                            style={{ width: 25, height: 25 }}
                        />
                    </Animated.View>
                );

                setPrimaryCats(prevCats => {
                    const updatedCats = prevCats.map(cat =>
                        cat.id === primaryCat.id ? { ...cat, spawnedObject: basicYarn } : cat
                    );
                    return updatedCats;
                });
            }, 2000);

        });

        return () => {
            spawnIntervals.forEach(intervalId => clearInterval(intervalId));
        };
    }, [primaryCats, setPrimaryCats]);

    const startTextAnimation = (primaryCat) => {
        const textPosition = new Animated.ValueXY({ x: 0, y: 0 });

        Animated.timing(textPosition, {
            toValue: { x: 0, y: -25 },
            duration: 800,
            useNativeDriver: false
        }).start(() => {
            setPrimaryCats(prevCats => {
                const updatedCats = prevCats.map(cat =>
                    cat.id === primaryCat.id ? { ...cat, spawnedObject: null } : cat
                );
                return updatedCats;
            });
        });

        const plusOne = (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: primaryCat.animatedValue.y._value,
                    left: primaryCat.animatedValue.x._value + 75,
                    transform: [{ translateX: textPosition.x }, { translateY: textPosition.y }]
                }}
                key={`${primaryCat.id}-text-${Date.now()}`}
            >
                <Text style={{ fontSize: 20 }}>+1</Text>
            </Animated.View>
        );

        setPrimaryCats(prevCats => {
            const updatedCats = prevCats.map(cat =>
                cat.id === primaryCat.id ? { ...cat, spawnedObject: plusOne } : cat
            );
            return updatedCats;
        });
    };
   

    useEffect(() => {
        panRespondersRef.current = primaryCats.map(primaryCat => (
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (evt, gestureState) => {
                    const { dx, dy } = gestureState;
                    setPrimaryCats(prevCats => prevCats.map(cat =>
                        cat.id === primaryCat.id ? { ...cat, x: dx, y: dy } : cat
                    ));
                    primaryCat.animatedValue.setValue({ x: primaryCat.animatedValue.x._value + dx, y: primaryCat.animatedValue.y._value + dy });
                },
                onPanResponderRelease: () => {
                    if (primaryCat.animatedValue.x._value >= (width * 0.80 - 50) || primaryCat.animatedValue.x._value <= 0 || primaryCat.animatedValue.y._value >= (height * 0.55 - 50) || primaryCat.animatedValue.y._value <= 0) {
                        const randomX = Math.floor(Math.random() * (width * 0.80 - 50));
                        const randomY = Math.floor(Math.random() * (height * 0.55 - 50));
                        animateCatToRandomPosition(primaryCat, randomX, randomY);
                    }
                },
            })
        ));
    }, [primaryCats]);

    const animateCatToRandomPosition = (cat, randomX, randomY) => {
        Animated.timing(cat.animatedValue, {
            toValue: { x: randomX, y: randomY },
            duration: 500,
            useNativeDriver: false
        }).start(() => {
            setPrimaryCats(prevCats =>
                prevCats.map(c =>
                    c.id === cat.id
                        ? { ...c, animatedValue: new Animated.ValueXY({ x: randomX, y: randomY }) }
                        : c
                )
            );
        });
    };

    return (
        <>
            {primaryCats.map((primaryCat, index) => (
                <View key={primaryCat.id}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: primaryCat.animatedValue.y,
                            left: primaryCat.animatedValue.x,
                            zIndex: 1,
                        }}
                        {...panRespondersRef.current[index]?.panHandlers}
                    >
                        <Image
                            source={require('../assets/Test_cat1.jpg')}
                            style={{ width: 50, height: 50 }}
                        />
                    </Animated.View>
                    {primaryCat.spawnedObject}
                </View>
            ))}
        </>
    );
};