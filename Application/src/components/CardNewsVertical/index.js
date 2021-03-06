import React from "react"
import { View, StyleSheet, Text } from "react-native"
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from "moment";
import { fontSize } from "@utils/constant";
import { useTheme } from '@react-navigation/native';

const CardNewsVertical = ({
    title,
    publishedAt,
    image
}) => {
    const { colors } = useTheme()

    return (
        <View style={[styles.viewContainer, { backgroundColor: colors?.BACKGROUND_COMPONENT }]}>
            <FastImage
                style={styles.fastImage}
                source={{
                    uri: image,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.viewText}>
                <Text style={[styles.text, { color: colors.TEXT_TITLE }]} numberOfLines={2}>{title}</Text>
                <Text style={[styles.subText, { color: colors.TEXT_SUBTITLE }]} numberOfLines={1}>{moment(publishedAt).format('l')}</Text>
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
    },
    text: {
        fontSize: fontSize.sm,
        paddingHorizontal: wp('2%'),
        fontWeight: 'bold'
    },
    subText: {
        fontSize: fontSize.sm,
        paddingHorizontal: wp('2%'),
    },
    fastImage: {
        width: wp('35%'),
        height: hp('11%'),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: 'black'
    },
    viewText: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: wp('1%'),
        justifyContent: 'space-around'
    }
})

export default CardNewsVertical