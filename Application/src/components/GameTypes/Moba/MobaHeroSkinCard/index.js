import React, { useState, useEffect } from 'react'
import { View, Animated, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useTheme } from "@react-navigation/native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontSize } from "@utils/constant";

const MobaHeroSkinCard = ({
    isHeroImage = "",
    isHeroDetail = {},
    setHeroImage = () => { },
    fadeAnimation = 0,
    gameId
}) => {
    const BASE_URI_HERO_ROV = 'https://www.arenaofvalor.com/images/heroes/'
    const ROLE = ['Unknow', 'Tank', 'Warrior', 'Assassin', 'Mage', 'Marksman', 'Support']
    const { colors } = useTheme()

    return (
        <Animated.View style={[styles.viewImage, { opacity: fadeAnimation }]}>
            <FastImage
                style={styles.fastImage}
                source={{ uri: isHeroImage }}
                resizeMode={gameId === 3 ? FastImage.resizeMode.cover : FastImage.resizeMode.contain}
            />
            <View style={styles.viewText} >
                <Text numberOfLines={1} style={{ color: colors.TEXT_ACTIVE, fontSize: fontSize.xs }} >{isHeroDetail?.job ? isHeroDetail?.title : ''}</Text>
                <Text numberOfLines={2} style={{ color: colors.TEXT_ACTIVE, fontSize: fontSize.xl }} >{isHeroDetail?.name}</Text>
                <Text numberOfLines={2} style={{ color: colors.TEXT_ACTIVE, fontSize: fontSize.xs }} >{isHeroDetail?.job && ROLE[isHeroDetail?.job].toUpperCase() || isHeroDetail?.title}</Text>
            </View>
            <ScrollView
                horizontal={true}
                style={styles.scrollView}>
                {
                    isHeroDetail.skin && isHeroDetail.skin.length > 0 && isHeroDetail.skin.map((skin) => {
                        return (
                            <TouchableOpacity
                                key={skin}
                                style={styles.touch}
                                onPress={() => setHeroImage(skin)}
                            >
                                <FastImage
                                    style={[styles.fastImage, {
                                        borderRadius: 5,
                                        borderWidth: isHeroImage && isHeroImage.indexOf(skin + '_big.jpg') > -1 ? 2 : 0,
                                        borderColor: colors.BORDER_ACTIVE
                                    }]}
                                    source={isHeroDetail?.skin ? { uri: BASE_URI_HERO_ROV + "skin/" + skin + '_icon.jpg' } : null}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    fastImage: {
        height: '100%',
        width: '100%',
    },
    viewImage: {
        width: wp('100%'),
        height: hp('30%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        flex: 1,
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: hp('5%'),
        marginHorizontal: 5
    },
    touch: {
        marginRight: 5,
        height: '100%',
        width: hp('5%'),
    },
    viewText: {
        position: 'absolute',
        left: 0,
        marginLeft: 5,
        width: wp('40%')
    },
})

export default MobaHeroSkinCard