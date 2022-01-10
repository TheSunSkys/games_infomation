import React, { useMemo, useState } from "react"
import { View, StyleSheet, Dimensions, Animated, ScrollView } from "react-native"
import { clientRov } from "@utils/cilent"
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';

import Header from '@components/Header'
import MobaView from "@components/GameTypes/Moba";

const GameDetail = ({ route }) => {
    const { colors } = useTheme();
    const { id, name = "", type = "", image, source = "", story = "" } = route?.params
    const [allHero, setAllHero] = useState([])
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0))

    const getAllHero = async () => {
        try {
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();

            if (type === "moba" && id === 3) {
                const { data: { data } } = await clientRov.getHero(0)
                setAllHero(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useMemo(() => {
        getAllHero()
    }, [])

    return (
        <View style={[styles.viewContainer, { backgroundColor: colors?.BACKGROUND }]}>
            <Header left={true} />
            <View style={styles.viewLogo}>
                <Animated.View
                    style={{ opacity: fadeAnimation }}>
                    <FastImage
                        style={styles.fastImage}
                        source={image}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </Animated.View>
            </View>
            <View style={styles.viewContent}>
                {
                    type === "moba" && allHero.length > 0 && <MobaView
                        story={story}
                        source={source}
                        allHero={allHero}
                        gameName={name}
                        gameId={id}
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1
    },
    fastImage: {
        height: wp('35%'),
        width: wp('35%'),
        borderRadius: 5,
    },
    viewLogo: {
        width: wp('100%'),
        height: hp('20%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContent: {
        width: wp('100%'),
        height: hp('100%'),
    }
})

export default GameDetail