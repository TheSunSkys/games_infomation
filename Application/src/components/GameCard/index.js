import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { fontSize } from "@utils/constant";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image'

const GameCard = ({
    image,
    onPass = () => { }
}) => {
    return (
        <TouchableOpacity onPass={onPass} style={styles.viewItem} >
            <FastImage
                style={styles.fastImage}
                source={image}
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
        height: '80%',
        width: '80%',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10
    }
})

export default GameCard