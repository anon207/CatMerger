import React, { useEffect, useRef } from 'react';
import { Image, PanResponder, Animated } from 'react-native';

export const PrimaryCats = ({ primaryCats, setPrimaryCats }) => {
    const panRespondersRef = useRef([]);

    useEffect(() => {
        panRespondersRef.current = primaryCats.map(primaryCat => (
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (evt, gestureState) => {
                    const { dx, dy } = gestureState;
                    setPrimaryCats(prevCats => prevCats.map(cat =>
                        cat.id === primaryCat.id ? { ...cat, x: cat.x + dx, y: cat.y + dy } : cat
                    ));
                },
                onPanResponderRelease: () => {
                    if (primaryCat.x >= 255 || primaryCat.x <= 0 || primaryCat.y >= 413 || primaryCat.y <= -1) {
                        setPrimaryCats(prevCats => prevCats.map(cat => {
                            if (cat.id === primaryCat.id) {
                                return {
                                    ...cat,
                                    x: 0,
                                    y: 0
                                };
                            }
                            return cat;
                        }));
                    }
                },
            })
        ));
    }, [primaryCats]);
console.log(primaryCats);
    return(
        <>
            {primaryCats.map((primaryCat, index) => (
                <Animated.View
                    key={primaryCat.id}
                    {...panRespondersRef.current[index]?.panHandlers}
                >
                    <Image
                        source={require('../assets/Test_cat1.jpg')}
                        style={{ width: 50, height: 50, position: 'absolute', top: primaryCat.y, left: primaryCat.x }}
                    />
                </Animated.View>
            ))}
        </>
    );
};