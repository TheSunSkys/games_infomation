import React, { useState, useMemo } from "react"
import { View, StyleSheet, Animated } from 'react-native'
import { useTheme } from "@react-navigation/native"
import Header from '@components/Header'
import { clientRov, clientDota2 } from "@utils/cilent"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fontSize } from "@utils/constant";
import { Tab, TabView } from 'react-native-elements';
import FastImage from 'react-native-fast-image'

import MobaHeroSkinCard from "@components/GameTypes/Moba/MobaHeroSkinCard"
import MobaHeroStory from "@components/GameTypes/Moba/MobaHeroStory"
import MobaHeroStats from "@components/GameTypes/Moba/MobaHeroStats"
import MobaHeroSkills from "@components/GameTypes/Moba/MobaHeroSkills"

const HeroDetail = ({ route }) => {
    const { colors } = useTheme()
    const { heroId, gameName, gameId, heroDetail = {} } = route?.params
    const [isHeroDetail, setHeroDetail] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isHeroImage, setHeroImage] = useState(null)
    const [index, setIndex] = useState(0);
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0))
    const [isSkillInfo, setSkillInfo] = useState(null)

    const uqName = (name) => {
        return name.replace(/npc_dota_hero_/ig, '')
    }

    const getHeroDetail = async () => {
        try {
            setLoading(true)
            setHeroDetail({
                image: ''
            })
            if (gameId === 3) {
                const { data: { data } } = await clientRov.getHero(heroId)
                const regex = /(<([^>]+)>)/ig;
                data.story = data.story.replace(regex, '');
                data.viability = Number(data?.viability) / 10
                data.damage = Number(data?.damage) / 10
                data.spelldamage = Number(data?.spelldamage) / 10
                data.difficulty = Number(data?.difficulty) / 10
                data.resizeMode = false
                // console.log(data)
                setHeroDetail(data)
                setHeroImage(`https://www.arenaofvalor.com/images/heroes/skin/${data?.skin[0]}_big.jpg`)
                setSkillInfo({
                    ...data?.skill[0],
                    index: 0
                })
            } else if (gameId === 2) {
                const { data: { result: { data: { heroes: data } } } } = await clientDota2.getHeroDetail(heroId)
                data[0].title = data[0].npe_desc_loc
                data[0].name = data[0].name_loc
                data[0].story = data[0].bio_loc
                data[0].resizeMode = true
                const hero_name = uqName(heroDetail.name)
                data[0].hero_name = hero_name
                setHeroImage(`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${hero_name}.png`)
                setHeroDetail(...data)
            }
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const changeImage = (id) => {
        if (gameId === 3) {
            setHeroImage(`https://www.arenaofvalor.com/images/heroes/skin/${id}_big.jpg`)
        }
    }

    useMemo(() => {
        getHeroDetail()
    }, [])

    return (
        <View style={[styles.viewContainer, { backgroundColor: colors.BACKGROUND }]}>
            <Header left={true} title={gameName} />
            {
                isHeroDetail &&
                <>
                    <MobaHeroSkinCard
                        fadeAnimation={fadeAnimation}
                        isHeroDetail={isHeroDetail}
                        isHeroImage={isHeroImage}
                        setHeroImage={changeImage}
                        gameId={gameId}
                    />
                    <Tab
                        value={index}
                        onChange={(e) => setIndex(e)}
                        disableIndicator={true}
                        variant="primary"
                    >
                        <Tab.Item
                            title="Story"
                            containerStyle={{ backgroundColor: colors?.BACKGROUND }}
                            titleStyle={[
                                styles.titleStyle,
                                {
                                    color: index === 0 ? colors?.TEXT_ACTIVE : colors.TEXT_UNACTIVE
                                }
                            ]}
                        />
                        <Tab.Item
                            title="Stats"
                            containerStyle={{ backgroundColor: colors?.BACKGROUND }}
                            titleStyle={[
                                styles.titleStyle,
                                {
                                    color: index === 1 ? colors?.TEXT_ACTIVE : colors.TEXT_UNACTIVE
                                }
                            ]}
                        />
                        <Tab.Item
                            title="Skills"
                            containerStyle={{ backgroundColor: colors?.BACKGROUND }}
                            titleStyle={[
                                styles.titleStyle,
                                {
                                    color: index === 2 ? colors?.TEXT_ACTIVE : colors.TEXT_UNACTIVE
                                }
                            ]}
                        />
                    </Tab>
                    <TabView
                        value={index}
                        onChange={setIndex}
                        animationType="spring"
                    >
                        <TabView.Item style={styles.tabView}>
                            <MobaHeroStory story={isHeroDetail?.story} />
                        </TabView.Item>
                        <TabView.Item style={styles.tabView}>
                            <MobaHeroStats gameId={gameId} isHeroDetail={isHeroDetail} />
                        </TabView.Item>
                        <TabView.Item style={[styles.tabView, { paddingHorizontal: 0 }]}>
                            <MobaHeroSkills
                                isHeroDetail={isHeroDetail}
                                isSkillInfo={isSkillInfo}
                                setSkillInfo={setSkillInfo}
                            />
                        </TabView.Item>
                    </TabView>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    viewText: {
        position: 'absolute',
        left: 0,
        marginLeft: 5
    },
    titleStyle: {
        fontSize: fontSize.sm
    },
    tabView: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
    },
})

export default HeroDetail