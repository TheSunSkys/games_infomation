import React from "react"
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

const CardNewsVerticalPlaceholder = () => {
    return (
        <View style={styles.viewContainer}>
            <Placeholder
                Animation={Fade}
                Left={() => (
                    <PlaceholderMedia style={styles.fastImage} />
                )}>
                <View style={styles.viewText}>
                    <PlaceholderLine />
                    <PlaceholderLine />
                    <PlaceholderLine style={styles.subTitle} />
                </View>
            </Placeholder>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: wp('5%'),
        marginBottom: hp('2%'),
    },
    subTitle: { width: wp('35%') },
    fastImage: {
        width: wp('35%'),
        height: hp('10%')
    },
    viewText: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: wp('1%'),
        justifyContent: 'space-around'
    }
})

export default CardNewsVerticalPlaceholder