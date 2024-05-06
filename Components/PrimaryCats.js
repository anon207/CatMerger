import React, { useEffect, useRef } from 'react';
import { Image, PanResponder, Animated, Dimensions, View } from 'react-native';

export const PrimaryCats = ({ primaryCats, setPrimaryCats }) => {
    const panRespondersRef = useRef([]);
    const { width, height } = Dimensions.get('window');

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
                    if (primaryCat.x >= (width*.80 - 50) || primaryCat.x <= 0 || primaryCat.y >= (height*.55 - 50) || primaryCat.y <= 0) {
                        const randomX = Math.floor(Math.random() * (width*.80 - 50));
                        const randomY = Math.floor(Math.random() * (height*.55 - 50));
                        setPrimaryCats(prevCats => prevCats.map(cat => {
                            if (cat.id === primaryCat.id) {
                                return {
                                    ...cat,
                                    x: randomX,
                                    y: randomY
                                };
                            }
                            return cat;
                        }));
                    }
                },
            })
        ));
    }, [primaryCats]);

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