import React, { useEffect } from 'react';
import { Image, Animated, Text } from 'react-native';

export const PrimaryCatAnimations = ({ primaryCat, setPrimaryCats, dxValue }) => {
    useEffect(() => {
        const spawnInterval = setInterval(() => {
            const spawnedObjectPosition = new Animated.ValueXY({ x: 0, y: 0 });

            Animated.timing(spawnedObjectPosition, {
                toValue: dxValue > 0 ? { x: 75, y: 15 } : { x: -75, y: 15 },
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
                        left: dxValue > 0 ? primaryCat.animatedValue.x._value : primaryCat.animatedValue.x._value + 25,
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

        return () => clearInterval(spawnInterval);
    }, [primaryCat, setPrimaryCats]);

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
                    left: dxValue > 0 ? primaryCat.animatedValue.x._value + 75 : primaryCat.animatedValue.x._value - 50,
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

    return (
        <>
            {primaryCat.spawnedObject}
        </>
    );
};