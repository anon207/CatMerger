import React, { useEffect, useRef } from 'react';
import { Image, PanResponder, Animated, Dimensions, View, Text } from 'react-native';

export const PrimaryCatPanResponder = ({ primaryCat, setPrimaryCats }) => {
    //const pan = useRef(new Animated.ValueXY()).current;
    const { width, height } = Dimensions.get('window');

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (evt, gestureState) => {
            const { dx, dy } = gestureState;
            setPrimaryCats(prevCats => prevCats.map(cat =>
                cat.id === primaryCat.id ? { ...cat, x: cat.x + dx, y: cat.y + dy } : cat
            ));
            primaryCat.animatedValue.setValue({ x: primaryCat.animatedValue.x._value + dx, y: primaryCat.animatedValue.y._value + dy });
          },
          onPanResponderRelease: () => {
            //pan.extractOffset();
            if (primaryCat.animatedValue.x._value >= (width * 0.80 - 50) || primaryCat.animatedValue.x._value <= 0 || primaryCat.animatedValue.y._value >= (height * 0.55 - 50) || primaryCat.animatedValue.y._value <= 0) {
                const randomX = Math.floor(Math.random() * (width * 0.80 - 50));
                const randomY = Math.floor(Math.random() * (height * 0.55 - 50));
                animateCatToRandomPosition(primaryCat, randomX, randomY);
            }
          },
        }),
      ).current;

    // useEffect(() => {
    //     panRespondersRef.current = primaryCats.map(primaryCat => (
    //         PanResponder.create({
    //             onStartShouldSetPanResponder: () => true,
    //             onPanResponderMove: (evt, gestureState) => {
    //                 const { dx, dy } = gestureState;
    //                 setPrimaryCats(prevCats => prevCats.map(cat =>
    //                     cat.id === primaryCat.id ? { ...cat, x: dx, y: dy } : cat
    //                 ));
    //                 primaryCat.animatedValue.setValue({ x: primaryCat.animatedValue.x._value + dx, y: primaryCat.animatedValue.y._value + dy });
    //             },
    //             onPanResponderRelease: () => {
    //                 if (primaryCat.animatedValue.x._value >= (width * 0.80 - 50) || primaryCat.animatedValue.x._value <= 0 || primaryCat.animatedValue.y._value >= (height * 0.55 - 50) || primaryCat.animatedValue.y._value <= 0) {
    //                     const randomX = Math.floor(Math.random() * (width * 0.80 - 50));
    //                     const randomY = Math.floor(Math.random() * (height * 0.55 - 50));
    //                     animateCatToRandomPosition(primaryCat, randomX, randomY);
    //                 }
    //             },
    //         })
    //     ));
    // }, [primaryCats]);

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

    return(
        <>
            <Animated.View
                style={{
                    position: 'absolute',
                    top: primaryCat.animatedValue.y._value,
                    left: primaryCat.animatedValue.x._value,
                    zIndex: 1,
                    //transform: [{translateX: pan.x}, {translateY: pan.y}],
                }}
                {...panResponder.panHandlers}
            >
                <Image
                    source={require('../assets/Test_cat1.jpg')}
                    style={{ width: 50, height: 50 }}
                />
            </Animated.View>
        </>
    );
};