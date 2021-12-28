import React from "react"
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

const CradNewsHorizonPlaceholder = ({
    index
}) => {
    return (
        <View style={[styles.viewContainer, index === 0 ? styles.firstCard : null]}>
            <Placeholder Animation={Fade}>
                <PlaceholderMedia style={styles.image} />
                <PlaceholderLine style={styles.title} />
                <PlaceholderLine style={styles.subTitle} />
            </Placeholder>
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
    image: {
        height: hp('20%'),
        width: wp('65%'),
        borderRadius: 10,
        marginBottom: hp('1%')
    },
    title: { width: wp('65%') },
    subTitle: { width: wp('30%') }
})

export default CradNewsHorizonPlaceholder