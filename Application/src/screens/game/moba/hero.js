import React, { useState, useMemo } from "react"
import { View, StyleSheet, Animated } from 'react-native'
import { useTheme } from "@react-navigation/native"
import Header from '@components/Header'
import { clientRov } from "@utils/cilent"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fontSize } from "@utils/constant";
import { Tab, TabView } from 'react-native-elements';
import MobaHeroSkinCard from "@components/GameTypes/Moba/MobaHeroSkinCard"
import MobaHeroStory from "@components/GameTypes/Moba/MobaHeroStory"
import MobaHeroStats from "@components/GameTypes/Moba/MobaHeroStats"
import MobaHeroSkills from "@components/GameTypes/Moba/MobaHeroSkills"

const HeroDetail = ({ route }) => {
    const { colors } = useTheme()
    const { heroId, gameName, gameId } = route?.params
    const [isHeroDetail, setHeroDetail] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isHeroImage, setHeroImage] = useState(null)
    const [index, setIndex] = useState(0);
    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0))
    const [isSkillInfo, setSkillInfo] = useState(null)

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
                // console.log(data)
                setHeroDetail(data)
                setHeroImage(data?.skin[0])
                setSkillInfo({
                    ...data?.skill[0],
                    index: 0
                })
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
                        setHeroImage={setHeroImage}
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
                            <MobaHeroStats isHeroDetail={isHeroDetail} />
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