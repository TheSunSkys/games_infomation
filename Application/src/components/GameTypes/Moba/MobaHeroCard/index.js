import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image'

const MobaHeroCard = ({
    name = "",
    image,
    onPress = () => { }
}) => {
    const BASE_URI_HERO_ROV = 'https://www.arenaofvalor.com/images/heroes/pic_122_122/'

    return (
        <TouchableOpacity onPress={onPress} style={styles.viewItem} >
            <FastImage
                style={styles.fastImage}
                source={image ? { uri: BASE_URI_HERO_ROV + image + '.jpg' } : null}
                resizeMode={FastImage.resizeMode.cover}
            />
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