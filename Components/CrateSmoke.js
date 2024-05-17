import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
export const CrateSmoke = ({ primaryCats, primaryCat, index, triggerSmokeAnimation }) => {
    const [showSmoke, setShowSmoke] = useState(false);
    const [showSmoke2, setShowSmoke2] = useState(false);
    const [showSmoke3, setShowSmoke3] = useState(false);
    const [showSmoke4, setShowSmoke4] = useState(false);
    const [showSmoke5, setShowSmoke5] = useState(false);
    
    useEffect(() => {
        if (triggerSmokeAnimation) {
            setShowSmoke(true);
            setTimeout(() => {
                setShowSmoke(false);
                setShowSmoke2(true);
                setShowSmoke3(true);
                setTimeout(() => {
                    setShowSmoke2(false);
                    setShowSmoke3(false);
                    setShowSmoke4(true);
                    setTimeout(() => {
                        setShowSmoke4(false);
                        setShowSmoke5(true);
                        setTimeout(() => {
                            setShowSmoke5(false);
                        }, 160);
                    }, 90);
                }, 70);
            }, 40);
        }
    }, [triggerSmokeAnimation]);

    return (
        <>
            {primaryCats.length-1 === index && showSmoke && (
                <Image
                    source={require('../assets/Clouds/Cloud1.png')}
                    style={{
                        width: 40,
                        height: 40,
                        position: 'absolute',
                        top: primaryCat.animatedValue.y._value+14,
                        left: primaryCat.animatedValue.x._value+14,
                        zIndex: 2,
                    }}
                />
            )}
            {primaryCats.length-1 === index && showSmoke2 && (
                <Image
                    source={require('../assets/Clouds/Cloud2.png')}
                    style={{
                        width: 50,
                        height: 50,
                        position: 'absolute',
                        top: primaryCat.animatedValue.y._value+5,
                        left: primaryCat.animatedValue.x._value+10,
                        zIndex: 2,
                    }}
                />
            )}
            {primaryCats.length-1 === index && showSmoke3 && (
                <Image
                    source={require('../assets/Clouds/Cloud3.png')}
                    style={{
                        width: 50,
                        height: 50,
                        position: 'absolute',
                        top: primaryCat.animatedValue.y._value+4,
                        left: primaryCat.animatedValue.x._value+10,
                        zIndex: 2,
                    }}
                />
            )}
            {primaryCats.length-1 === index && showSmoke4 && (
                <Image
                    source={require('../assets/Clouds/Cloud4.png')}
                    style={{
                        width: 70,
                        height: 70,
                        position: 'absolute',
                        top: primaryCat.animatedValue.y._value-7,
                        left: primaryCat.animatedValue.x._value,
                        zIndex: 2,
                    }}
                />
            )}
            {primaryCats.length-1 === index && showSmoke5 && (
                <Image
                    source={require('../assets/Clouds/Cloud5.png')}
                    style={{
                        width: 85,
                        height: 85,
                        position: 'absolute',
                        top: primaryCat.animatedValue.y._value-10,
                        left: primaryCat.animatedValue.x._value-7,
                        zIndex: 2,
                    }}
                />
            )}
        </>
    );
};