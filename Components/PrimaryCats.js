import React, { useEffect, useRef, useState } from 'react';
import { Image, PanResponder, Animated, Dimensions, View, Text } from 'react-native';
import { PrimaryCatAnimations } from './PrimaryCatAnimations';

export const PrimaryCats = React.memo(({ primaryCats, setPrimaryCats, setMoney, showSmoke, showSmoke2, showSmoke3, showSmoke4, showSmoke5 }) => {
    const { width, height } = Dimensions.get('window');
    const [dxValues, setDxValues] = useState(primaryCats.map(() => 1));
    const [panResponders, setPanResponders] = useState([]);

    useEffect(() => {
        const responders = primaryCats.map((primaryCat, index) =>
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
                    const cat = primaryCats[index];
                    if (cat.animatedValue.x._value >= (width * 0.80 - 50) || cat.animatedValue.x._value <= 0 || cat.animatedValue.y._value >= (height * 0.55 - 50) || cat.animatedValue.y._value <= 0) {
                        const randomX = Math.floor(Math.random() * (width * 0.80 - 50));
                        const randomY = Math.floor(Math.random() * (height * 0.55 - 50));
                        animateCatToRandomPosition(cat, randomX, randomY);
                    }
                },
            })
        );

        setPanResponders(responders);

        return () => {
            // Cleanup if needed
        };
    }, [dxValues, primaryCats, setPrimaryCats, width, height]);

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
                        {...panResponders[index]?.panHandlers}
                    >
                        <Image
                            source={dxValues[index] > 0 ? require('../assets/Cats/Kitten.png') : require('../assets/Cats/Kitten_Reflection.png')}
                            style={{ width: 60, height: 60 }}
                        />
                    </Animated.View>
                    <PrimaryCatAnimations primaryCat={primaryCat} setPrimaryCats={setPrimaryCats} dxValue={dxValues[index]} setMoney={setMoney}/>
                    {showSmoke && (
                        <Animated.View
                        style={{
                            position: 'absolute',
                            top: primaryCat.animatedValue.y._value+14, // Adjust the position of the smoke cloud as needed
                            left: primaryCat.animatedValue.x._value+14, // Adjust the position of the smoke cloud as needed
                            zIndex: 2, // Ensure the smoke cloud appears above the crate
                        }}
                        >
                        <Image
                            source={require('../assets/Clouds/Cloud1.png')}
                            style={{
                                width: 40,
                                height: 40,
                            }}
                        />
                        </Animated.View>
                    )}
                    {showSmoke2 && (
                        <Animated.View
                        style={{
                            position: 'absolute',
                            top: primaryCat.animatedValue.y._value+5, // Adjust the position of the smoke cloud as needed
                            left: primaryCat.animatedValue.x._value+10, // Adjust the position of the smoke cloud as needed
                            zIndex: 2, // Ensure the smoke cloud appears above the crate
                        }}
                        >
                        <Image
                            source={require('../assets/Clouds/Cloud2.png')}
                            style={{
                                width: 50,
                                height: 50,
                            }}
                        />
                        </Animated.View>
                    )}
                    {showSmoke3 && (
                        <Animated.View
                        style={{
                            position: 'absolute',
                            top: primaryCat.animatedValue.y._value+4, // Adjust the position of the smoke cloud as needed
                            left: primaryCat.animatedValue.x._value+10, // Adjust the position of the smoke cloud as needed
                            zIndex: 2, // Ensure the smoke cloud appears above the crate
                        }}
                        >
                        <Image
                            source={require('../assets/Clouds/Cloud3.png')}
                            style={{
                                width: 50,
                                height: 50,
                            }}
                        />
                        </Animated.View>
                    )}
                    {showSmoke4 && (
                        <Animated.View
                        style={{
                            position: 'absolute',
                            top: primaryCat.animatedValue.y._value-7, // Adjust the position of the smoke cloud as needed
                            left: primaryCat.animatedValue.x._value, // Adjust the position of the smoke cloud as needed
                            zIndex: 2, // Ensure the smoke cloud appears above the crate
                        }}
                        >
                        <Image
                            source={require('../assets/Clouds/Cloud4.png')}
                            style={{
                                width: 70,
                                height: 70,
                            }}
                        />
                        </Animated.View>
                    )}
                    {showSmoke5 && (
                        <Animated.View
                        style={{
                            position: 'absolute',
                            top: primaryCat.animatedValue.y._value-10, // Adjust the position of the smoke cloud as needed
                            left: primaryCat.animatedValue.x._value-7, // Adjust the position of the smoke cloud as needed
                            zIndex: 2, // Ensure the smoke cloud appears above the crate
                        }}
                        >
                        <Image
                            source={require('../assets/Clouds/Cloud5.png')}
                            style={{
                                width: 85,
                                height: 85,
                            }}
                        />
                        </Animated.View>
                    )}
                </View>
            ))}
        </>
    );
});