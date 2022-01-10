import React from "react"
import { Text, View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from "moment";
import { fontSize } from "@utils/constant";
import { useTheme } from '@react-navigation/native';

const CardNewsHorizon = ({
    image,
    publishedAt,
    title,
    index
}) => {
    const { colors } = useTheme()

    return (
        <View style={[styles.viewContainer, index === 0 ? styles.firstCard : null]}>
            <View
                style={[styles.viewCard, { backgroundColor: colors?.BACKGROUND_COMPONENT }]}>
                <FastImage
                    style={styles.fastImage}
                    source={{
                        uri: image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.viewText}>
                    <Text style={[styles.text, { color: colors.TEXT_TITLE }]} numberOfLines={1}>{title}</Text>
                    <Text style={[styles.subText, { color: colors.TEXT_SUBTITLE }]} numberOfLines={1}>{moment(publishedAt).format('l')}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: hp('1%'),
        marginBottom: hp('3%'),
        marginRight: wp('5%'),
    },
    firstCard: {
        marginHorizontal: wp('5%')
    },
    viewCard: {
        flex: 1,
        height: hp('25%'),
        width: wp('65%'),
        borderRadius: 10,
    },
    fastImage: {
        height: '70%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    viewText: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: fontSize.sm,
        paddingHorizontal: wp('2%'),
        fontWeight: 'bold'
    },
    subText: {
        fontSize: fontSize.sm,
        paddingHorizontal: wp('2%'),
    }
})

export default CardNewsHorizon