import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from "@react-navigation/native"
import { fontSize } from "@utils/constant";
import { LinearProgress } from 'react-native-elements';
import FastImage from 'react-native-fast-image';

const MobaHeroStats = ({
    isHeroDetail = {}
}) => {
    const { colors } = useTheme()

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.viewProgress}>
                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>Poise</Text>
                <LinearProgress
                    color={colors.PROGRESS}
                    style={styles.progress}
                    value={isHeroDetail?.viability}
                    variant="determinate"
                />
            </View>
            <View style={styles.viewProgress}>
                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>Attack damage</Text>
                <LinearProgress
                    color={colors.PROGRESS}
                    style={styles.progress}
                    value={isHeroDetail?.damage}
                    variant="determinate"
                />
            </View>
            <View style={styles.viewProgress}>
                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>Ability effects</Text>
                <LinearProgress
                    color={colors.PROGRESS}
                    style={styles.progress}
                    value={isHeroDetail?.spelldamage}
                    variant="determinate"
                />
            </View>
            <View style={styles.viewProgress}>
                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>Difficulty</Text>
                <LinearProgress
                    color={colors.PROGRESS}
                    style={styles.progress}
                    value={isHeroDetail?.difficulty}
                    variant="determinate"
                />
            </View>
            <View style={styles.viewCardStatus}>
                <View style={[styles.viewCardStat, { borderColor: colors.BORDER_ACTIVE }]}>
                    <View style={styles.viewImage}>
                        <FastImage
                            style={styles.fastImage}
                            source={require('@assets/image/icon/heart.png')}
                        />
                    </View>
                    <View style={styles.viewStat}>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>BASE</Text>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.basehp}</Text>
                    </View>
                    <View style={styles.viewStat}>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>GROWTH</Text>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.growthhp}</Text>
                    </View>
                </View>
                <View style={[styles.viewCardStat, { borderColor: colors.BORDER_ACTIVE }]}>
                    <View style={styles.viewImage}>
                        <FastImage
                            style={styles.fastImage}
                            source={require('@assets/image/icon/sword.png')}
                        />
                    </View>
                    <View style={styles.viewStat}>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>BASE</Text>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.baseatk}</Text>
                    </View>
                    <View style={styles.viewStat}>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>GROWTH</Text>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.growthatk}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewStatus}>
                <View style={[styles.viewCardStat, { borderColor: colors.BORDER_ACTIVE }]}>
                    <View style={styles.viewImage}>
                        <FastImage
                            style={styles.fastImage}
                            source={require('@assets/image/icon/shield.png')}
                        />
                    </View>
                    <View style={styles.viewStat}>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>BASE</Text>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.basedef}</Text>
                    </View>
                    <View style={styles.viewStat}>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>GROWTH</Text>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.growthdef}</Text>
                    </View>
                </View>
                <View style={[styles.viewCardStat, { borderColor: colors.BORDER_ACTIVE }]}>
                    <View style={styles.viewImage}>
                        <FastImage
                            style={styles.fastImage}
                            source={require('@assets/image/icon/shield_res.png')}
                        />
                    </View>
                    <View style={styles.viewStat}>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>BASE</Text>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.baseres}</Text>
                    </View>
                    <View style={styles.viewStat}>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>GROWTH</Text>
                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.growthres}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewProgress: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    fastImage: {
        width: wp('15%'),
        height: wp('15%')
    },
    viewImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
    scrollView: {
        width: wp('100%'),
        paddingHorizontal: wp('5%')
    },
    titleStyle: {
        fontSize: fontSize.sm
    },
    viewStatus: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: hp('2%')
    },
    viewCardStat: {
        width: wp('35%'),
        height: wp('35%'),
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: wp('3%'),
        justifyContent: 'center',
    },
    viewStat: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    viewCardStatus: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: hp('2%')
    },
    progress: {
        width: wp('50%'),
    }
})

export default MobaHeroStats