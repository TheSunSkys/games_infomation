import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image'
import { useTheme } from '@react-navigation/native';

const MobaHeroCard = ({
    gameId = 1,
    image,
    onPress = () => { }
}) => {
    const { colors } = useTheme()
    const BASE_URI_HERO_ROV = 'https://www.arenaofvalor.com/images/heroes/pic_122_122/'
    const BASE_URI_HERO_DOTA_2 = 'http://cdn.dota2.com'

    return (
        <TouchableOpacity onPress={onPress} style={[styles.viewItem, { backgroundColor: colors?.BACKGROUND_COMPONENT }]} >
            {
                gameId === 3 &&
                <FastImage
                    style={styles.fastImage}
                    source={image ? { uri: BASE_URI_HERO_ROV + image + '.jpg' } : null}
                    resizeMode={FastImage.resizeMode.cover}
                />
            }
            {
                gameId === 2 &&
                <FastImage
                    style={styles.fastImage}
                    source={image ? { uri: BASE_URI_HERO_DOTA_2 + image } : null}
                    resizeMode={FastImage.resizeMode.cover}
                />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: wp('1.5%'),
        backgroundColor: '#CFCFCF',
        borderRadius: 5
    },
    fastImage: {
        height: '100%',
        width: '100%',
        borderRadius: 5,
    }
})

export default MobaHeroCard