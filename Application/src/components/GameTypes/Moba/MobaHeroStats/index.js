import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from "@react-navigation/native"
import { fontSize } from "@utils/constant";
import { LinearProgress } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const MobaHeroStats = ({
    isHeroDetail = {},
    gameId = 1
}) => {
    const { colors } = useTheme()
    const ROLES_DOTA = ["Carry", "Support", "Nuker", "Disabler", "Jungler", "Durable", "Escape", "Pusher", "Initiator"]
    return (
        <ScrollView style={styles.scrollView}>
            {
                gameId === 3 && <>

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
                </>
            }
            {
                gameId === 2 && isHeroDetail && <>
                    <View style={styles.viewDotaInfo}>
                        <View>
                            <FastImage
                                style={styles.fastImageHero}
                                source={{ uri: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${isHeroDetail?.hero_name}.png` }}
                            />
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#286323', '#7AF03C']}
                                style={styles.linearGradient}
                            >
                                <View style={styles.viewTextOnColorBg}>
                                    <Text
                                        style={{
                                            color: colors?.TEXT_ON_COLOR_BACKGROUND,
                                            fontSize: fontSize?.xs,
                                        }}>
                                        {isHeroDetail?.max_health}
                                    </Text>
                                    <Text
                                        style={{
                                            color: colors?.TEXT_ON_COLOR_LIFHT,
                                            fontSize: fontSize?.xxs,
                                            right: 0,
                                            position: 'absolute',
                                            marginRight: 5
                                        }}>
                                        +{isHeroDetail?.health_regen?.toFixed(1)}
                                    </Text>
                                </View>
                            </LinearGradient>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#1056DB', '#73F5FE']}
                                style={styles.linearGradient}
                            >
                                <View style={styles.viewTextOnColorBg}>
                                    <Text
                                        style={{
                                            color: colors?.TEXT_ON_COLOR_BACKGROUND,
                                            fontSize: fontSize?.xs
                                        }}>
                                        {isHeroDetail?.max_mana}
                                    </Text>
                                    <Text
                                        style={{
                                            color: colors?.TEXT_ON_COLOR_LIFHT,
                                            fontSize: fontSize?.xxs,
                                            right: 0,
                                            position: 'absolute',
                                            marginRight: 5
                                        }}>
                                        +{isHeroDetail?.mana_regen?.toFixed(1)}
                                    </Text>
                                </View>
                            </LinearGradient>
                        </View>
                        <View style={styles.viewDotaStat}>
                            <View style={styles.viewImageDotaStat}>
                                <FastImage
                                    style={styles.imageDotaStat}
                                    source={require('@assets/image/icon/hero_strength.png')}
                                />
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.str_base}</Text>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>+{isHeroDetail?.str_gain?.toFixed(1)}</Text>
                                </View>
                            </View>
                            <View style={styles.viewImageDotaStat}>
                                <FastImage
                                    style={styles.imageDotaStat}
                                    source={require('@assets/image/icon/hero_agility.png')}
                                />
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.agi_base}</Text>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>+{isHeroDetail?.agi_gain?.toFixed(1)}</Text>
                                </View>
                            </View>
                            <View style={styles.viewImageDotaStat}>
                                <FastImage
                                    style={styles.imageDotaStat}
                                    source={require('@assets/image/icon/hero_intelligence.png')}
                                />
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.int_base}</Text>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>+{isHeroDetail?.int_gain?.toFixed(1)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        isHeroDetail?.role_levels
                        && isHeroDetail?.role_levels.length > 0
                        && isHeroDetail?.role_levels.map((role, index) => {
                            if (role > 0) {
                                return (
                                    <View key={'role-' + index} style={styles.viewProgress}>
                                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{ROLES_DOTA[index]}</Text>
                                        <LinearProgress
                                            color={colors.PROGRESS}
                                            style={styles.progress}
                                            value={role / 3}
                                            variant="determinate"
                                        />
                                    </View>
                                )
                            }
                        })
                    }
                    <View style={[styles.viewStats, { borderColor: colors.BORDER_ACTIVE }]}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[styles.textStatIcon, { color: colors?.TEXT_STORY, backgroundColor: colors.BACKGROUND }]}>ATTACK</Text>
                        </View>
                        <View style={styles.viewContainerStatIcon}>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_damage.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.damage_min + "-" + isHeroDetail?.damage_max}</Text>
                            </View>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_attack_time.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.attack_rate?.toFixed(1)}</Text>
                            </View>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_attack_range.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.attack_range}</Text>
                            </View>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_projectile_speed.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.projectile_speed}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.viewStats, { borderColor: colors.BORDER_ACTIVE }]}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[styles.textStatIcon, { color: colors?.TEXT_STORY, backgroundColor: colors.BACKGROUND }]}>DEFENSE</Text>
                        </View>
                        <View style={styles.viewContainerStatIcon}>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_armor.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.armor?.toFixed(1)}</Text>
                            </View>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_magic_resist.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.magic_resistance}%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.viewStats, { borderColor: colors.BORDER_ACTIVE, marginBottom: hp('2%') }]}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[styles.textStatIcon, { color: colors?.TEXT_STORY, backgroundColor: colors.BACKGROUND }]}>MOBILITY</Text>
                        </View>
                        <View style={styles.viewContainerStatIcon}>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_movement_speed.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.movement_speed}</Text>
                            </View>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_turn_rate.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.turn_rate?.toFixed(1)}%</Text>
                            </View>
                            <View style={styles.viewStatIcon}>
                                <FastImage
                                    style={styles.fastImageDota}
                                    source={require('@assets/image/icon/icon_vision.png')}
                                />
                                <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isHeroDetail?.sight_range_day}/{isHeroDetail?.sight_range_night}</Text>
                            </View>
                        </View>
                    </View>
                </>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewProgress: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    fastImageDota: {
        width: wp('8%'),
        height: wp('8%'),
        margin: 5
    },
    fastImage: {
        width: wp('12%'),
        height: wp('12%'),
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
    },
    imageDotaStat: {
        width: wp('12%'),
        height: wp('12%'),
        marginVertical: 2,
        marginRight: 5
    },
    viewImageDotaStat: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    linearGradient: {
        width: wp('40%'),
        height: wp('4%'),
        justifyContent: 'center'
    },
    viewTextOnColorBg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fastImageHero: {
        width: wp('40%'),
        height: wp('30%')
    },
    viewDotaStat: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewDotaInfo: {
        paddingVertical: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    viewStats: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        width: '100%',
        marginTop: hp('2%')
    },
    viewStatIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewContainerStatIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textStatIcon: {
        top: 0, position: 'absolute',
        marginTop: -hp('2%'),
        paddingHorizontal: 2,
        fontSize: fontSize.sm
    }
})

export default MobaHeroStats