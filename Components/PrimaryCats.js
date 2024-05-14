import React, { useEffect, useRef, useState } from 'react';
import { Image, PanResponder, Animated, Dimensions, View, Text } from 'react-native';
import { PrimaryCatAnimations } from './PrimaryCatAnimations';
import { PrimaryCatPanResponder } from './PrimaryCatPanResponder';

export const PrimaryCats = ({ primaryCats, setPrimaryCats, setMoney }) => {
    const panRespondersRef = useRef([]);
    const { width, height } = Dimensions.get('window');
    const [dxValues, setDxValues] = useState(primaryCats.map(() => 1));

    useEffect(() => {
        panRespondersRef.current = primaryCats.map((primaryCat, index) => (
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (evt, gestureState) => {
                    const { dx, dy } = gestureState;
                    const newDxValues = [...dxValues];
                    newDxValues[index] = dx;
                    setDxValues(newDxValues);
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
    }, [dxValues, primaryCats]);

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
                            source={dxValues[index] > 0 ? require('../assets/Cats/Kitten.png') : require('../assets/Cats/Kitten_Reflection.png')}
                            style={{ width: 60, height: 60 }}
                        />
                    </Animated.View>
                    <PrimaryCatAnimations primaryCat={primaryCat} setPrimaryCats={setPrimaryCats} dxValue={dxValues[index]} setMoney={setMoney}/>
                </View>
            ))}
        </>
    );
};