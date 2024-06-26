import React, { useEffect, useState } from 'react';
import { Image, PanResponder, Animated, Dimensions, View, Text} from 'react-native';
import { PrimaryCatAnimations } from './PrimaryCatAnimations';
import { CrateSmoke } from './CrateSmoke';

export const PrimaryCats = React.memo(({ primaryCats, setPrimaryCats, setMoney, crates}) => {
    const [previousCratesLength, setPreviousCratesLength] = useState(crates.length);
    const [dxValues, setDxValues] = useState(primaryCats.map(() => 1));
    const [panResponders, setPanResponders] = useState([]);
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        setPreviousCratesLength(crates.length);
    }, [crates]);

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
        return () => {};
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
                    <CrateSmoke primaryCats={primaryCats} primaryCat={primaryCat} index={index} triggerSmokeAnimation={crates.length < previousCratesLength}/>
                </View>
            ))}
        </>
    );
});