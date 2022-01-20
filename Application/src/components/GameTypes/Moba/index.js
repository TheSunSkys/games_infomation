import React, { useState, useCallback } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { Tab, Text, TabView, Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

import MobaHeroCard from "./MobaHeroCard";
import { fontSize } from "@utils/constant";

const MobaView = ({ allHero, gameName = "", gameId = 1, story = "", source = "" }) => {
    const { colors } = useTheme()
    const navigation = useNavigation()
    const [index, setIndex] = useState(0);
    const [numberLineStory, setNumberLineStory] = useState(10);
    const [numberStory, setNumberStory] = useState(0);
    const [showMore, setShowMore] = useState(false)

    const onTextLayout = useCallback(e => {
        setShowMore(e.nativeEvent.lines.length > numberLineStory);
        setNumberStory(e.nativeEvent.lines.length)
    }, [numberLineStory]);

    const dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    }).cloneWithRows(allHero);

    const layoutProvider = new LayoutProvider(
        index => index,
        (type, dim) => {
            dim.width = (wp('100%') - 1) / 4
            dim.height = (wp('100%') - 1) / 4
        },
    );

    const renderItem = (t, data) => {
        // console.log(data?.image)
        if (gameId === 2) {
            return <MobaHeroCard
                gameId={gameId}
                image={data?.image}
                onPress={() => navigation.navigate('HeroDetailScreen',
                    {
                        heroId: data?.id,
                        gameName: gameName,
                        gameId: gameId,
                        heroDetail: data
                    })}
            />
        } else if (gameId === 3) {
            return <MobaHeroCard
                gameId={gameId}
                image={data?.heroid}
                onPress={() => navigation.navigate('HeroDetailScreen',
                    {
                        heroId: data?.heroid,
                        gameName: gameName,
                        gameId: gameId
                    })}
            />
        }
    }

    return (
        <>
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
                    title="Hero"
                    containerStyle={{ backgroundColor: colors?.BACKGROUND }}
                    titleStyle={[
                        styles.titleStyle,
                        {
                            color: index === 1 ? colors?.TEXT_ACTIVE : colors.TEXT_UNACTIVE
                        }
                    ]}
                />
            </Tab>
            <TabView
                value={index}
                onChange={setIndex}
                animationType="spring"
            >
                <TabView.Item style={[styles.tabView, { paddingHorizontal: wp('5%'), }]}>
                    <ScrollView>
                        <Text
                            numberOfLines={numberLineStory}
                            onTextLayout={onTextLayout}
                            style={{ color: colors?.TEXT_STORY, fontSize: fontSize.sm }}>      {story}</Text>
                        {
                            showMore && <View style={styles.viewBotton}>
                                <Button
                                    type="clear"
                                    containerStyle={{ width: wp('30%') }}
                                    titleStyle={[styles.textStory, { color: colors?.TEXT_TITLE }]}
                                    onPress={() => {
                                        setNumberLineStory(numberStory + 1)
                                    }}
                                    title={"More ..."}
                                />
                            </View>
                        }
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={styles.tabView}>
                    <RecyclerListView
                        style={{ backgroundColor: colors?.BACKGROUND }}
                        dataProvider={dataProvider}
                        layoutProvider={layoutProvider}
                        rowRenderer={renderItem}
                    />
                </TabView.Item>
            </TabView>
        </>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: fontSize.sm
    },
    tabView: {
        width: wp('100%'),
        height: hp('100%'),
        paddingBottom: hp('40%'),
    },
    viewBotton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MobaView