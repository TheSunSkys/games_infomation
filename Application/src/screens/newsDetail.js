import React, { useCallback } from "react"
import { View, StyleSheet, ScrollView, Text, Linking } from "react-native"
import Header from "@components/Header";
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from "moment";
import { fontSize } from "@utils/constant";

const NewsDetail = ({ route }) => {
    const { data } = route?.params

    const handlePress = useCallback(async () => {
        await Linking.openURL(data?.url);
    }, [data?.url]);

    return (
        <View style={styles.viewContainer}>
            <Header title={'News Detail'} />
            <ScrollView style={styles.viewContainer} showsVerticalScrollIndicator={false}>
                <FastImage
                    style={styles.fastImage}
                    source={{
                        uri: data?.image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.viewText}>
                    <Text style={styles.textTitle}>{data?.title}</Text>
                    <Text style={[styles.textContent, { fontWeight: '500' }]}>{moment(data?.publishedAt).format('l')}</Text>
                    <Text style={styles.textContent}>     {data?.content.substring(0, data?.content.length - 12)}</Text>
                    <Text style={styles.textReadMore}>Read More</Text>
                    <Text style={styles.textUrl} onPress={handlePress}>{data?.url}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    fastImage: {
        width: wp('100%'),
        height: hp('25%'),
        backgroundColor: 'black'
    },
    viewContainer: {
        flex: 1,
    },
    textTitle: {
        fontSize: fontSize.lg,
        fontWeight: 'bold'
    },
    textContent: {
        paddingTop: hp('1%'),
        fontSize: fontSize.sm
    },
    textReadMore: {
        paddingTop: hp('1%'),
        fontSize: fontSize.md,
        fontWeight: 'bold'
    },
    textUrl: {
        fontSize: fontSize.sm,
        color: '#659AFE'
    },
    viewText: {
        marginHorizontal: wp('5%'),
        marginVertical: hp('2%')
    }
})

export default NewsDetail