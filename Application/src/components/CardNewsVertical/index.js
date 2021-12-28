import React from "react"
import { View, StyleSheet, Text } from "react-native"
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from "moment";

const CardNewsVertical = ({
    title,
    publishedAt,
    image
}) => {
    return (
        <View style={styles.viewContainer}>
            <FastImage
                style={styles.fastImage}
                source={{
                    uri: image,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.viewText}>
                <Text style={styles.text} numberOfLines={2}>{title}</Text>
                <Text style={styles.subText} numberOfLines={1}>{moment(publishedAt).format('l')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: wp('5%'),
        marginBottom: hp('2%'),
        borderRadius: 5,
        backgroundColor: '#CFCFCF'
    },
    text: {
        fontSize: hp('2%'),
        paddingHorizontal: wp('2%'),
        fontWeight: 'bold'
    },
    subText: {
        fontSize: hp('2%'),
        paddingHorizontal: wp('2%'),
    },
    fastImage: {
        width: wp('35%'),
        height: hp('11%'),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    viewText: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: wp('1%'),
        justifyContent: 'space-around'
    }
})

export default CardNewsVertical