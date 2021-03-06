import React from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, ImageBackground } from 'react-native'
import { useTheme } from "@react-navigation/native"
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontSize } from "@utils/constant";

const MobaHeroSkills = ({
    isHeroDetail = {},
    isSkillInfo = {},
    setSkillInfo = () => { },
    gameId = 1
}) => {
    const { colors } = useTheme()
    const BASE_URI_HERO_ROV = 'https://www.arenaofvalor.com/images/heroes/'
    const regex = /(<([^>]+)>)/ig;

    return (
        <ScrollView>
            {
                gameId === 3 && <>
                    <View style={styles.viewContainer}>
                        <View style={styles.viewContent}>
                            <ScrollView horizontal={true} >
                                {
                                    isHeroDetail?.skill && isHeroDetail?.skill.length > 0 && isHeroDetail?.skill.map((skill, index) => {
                                        if (skill?.skillname.toUpperCase() !== "RESTORE") {
                                            return (
                                                <TouchableOpacity
                                                    key={skill + index}
                                                    style={styles.touch}
                                                    onPress={() => setSkillInfo({
                                                        ...skill,
                                                        index
                                                    })}
                                                >
                                                    <ImageBackground
                                                        style={styles.imageBackgound}
                                                        source={isSkillInfo?.index === index ? {
                                                            uri: 'https://www.arenaofvalor.com/web2017/images/details/quan.png'
                                                        } : null}
                                                        resizeMode="cover">
                                                        <FastImage
                                                            style={styles.fastImage}
                                                            source={{ uri: BASE_URI_HERO_ROV + "skill/" + skill?.skillicon + '.png' }}
                                                            resizeMode={FastImage.resizeMode.cover}
                                                        />
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            )
                                        }
                                    })
                                }
                            </ScrollView>
                        </View>
                        {
                            isSkillInfo && <View style={[styles.viewSkillInfo, { borderColor: colors.BORDER_ACTIVE }]}>
                                <Text style={{ color: colors?.TEXT_STORY, fontSize: fontSize.lg }}>{isSkillInfo?.skillname}</Text>
                                <View style={styles.viewRow}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{"TYPE: "}</Text>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isSkillInfo?.index === 0 ? "PASSIVE" : "ACTIVE"}</Text>
                                </View>
                                {
                                    isSkillInfo?.index !== 0 && <View style={styles.viewRow}>
                                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{"COOLDOWN: "}</Text>
                                        <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{`${parseInt(isSkillInfo?.cooldown / 60)} Sec`}</Text>
                                    </View>
                                }
                                <View style={styles.viewRow}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>     {isSkillInfo?.desc}</Text>
                                </View>
                            </View>
                        }
                    </View>
                </>
            }
            {
                gameId === 2 && <>
                    <View style={styles.viewContainer}>
                        <View style={styles.viewContent}>
                            <ScrollView horizontal={true} >
                                {
                                    isHeroDetail?.abilities && isHeroDetail?.abilities?.length > 0 && isHeroDetail?.abilities?.map((skill, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={skill?.name + index}
                                                style={styles.touch}
                                                onPress={() => setSkillInfo({
                                                    ...skill,
                                                    index
                                                })}
                                            >
                                                <ImageBackground
                                                    style={styles.imageBackgound}
                                                    source={isSkillInfo?.index === index ? {
                                                        uri: 'https://www.arenaofvalor.com/web2017/images/details/quan.png'
                                                    } : null}
                                                    resizeMode="cover">
                                                    <FastImage
                                                        style={styles.fastImage}
                                                        source={{ uri: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${skill?.name}.png` }}
                                                        resizeMode={FastImage.resizeMode.cover}
                                                    />
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                        {
                            isSkillInfo && <View style={[styles.viewSkillInfo, { borderColor: colors.BORDER_ACTIVE }]}>
                                <Text style={{ color: colors?.TEXT_STORY, fontSize: fontSize.lg }}>{isSkillInfo?.name_loc}</Text>
                                <View style={styles.viewRow}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{"MAX LEVEL: "}</Text>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isSkillInfo?.max_level}</Text>
                                </View>
                                <View style={styles.viewRow}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{"COOLDOWN: "}</Text>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isSkillInfo?.cooldowns?.length > 1 ? isSkillInfo?.cooldowns?.join('/') : isSkillInfo?.cooldowns[0].toFixed(2)} Sec</Text>
                                </View>
                                <View style={styles.viewRow}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{"MANA: "}</Text>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>{isSkillInfo?.mana_costs?.join('/')}</Text>
                                </View>
                                <View style={styles.viewRow}>
                                    <Text style={[styles.titleStyle, { color: colors?.TEXT_STORY }]}>     {isSkillInfo?.desc_loc?.replace(regex, '')}</Text>
                                </View>
                            </View>
                        }
                    </View>
                </>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        width: wp('100%'),
        paddingHorizontal: wp('5%'),
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    titleStyle: {
        fontSize: fontSize.sm
    },
    viewSkillInfo: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        width: '100%',
    },
    viewRow: {
        flexDirection: 'row'
    },
    fastImage: {
        width: '90%',
        height: '90%',
        borderRadius: wp('20%') / 2,
    },
    imageBackgound: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    touch: {
        marginBottom: hp('1%'),
        padding: wp('3%'),
        width: wp('20%'),
        height: wp('20%'),
    },
    viewContent: {
        height: wp('20%'),
        marginBottom: hp('1%')
    }
})

export default MobaHeroSkills