import React, { useState } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { Tab, Text, TabView } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

import MobaHeroCard from "./MobaHeroCard";
import { fontSize } from "@utils/constant";

const MobaView = ({ allHero, gameName = "", gameId = 1, story = "", source = "" }) => {
    const { colors } = useTheme()
    const navigation = useNavigation()
    const [index, setIndex] = useState(0);

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
                        <Text style={{ color: colors?.TEXT_STORY, fontSize: fontSize.sm }}>      {story}</Text>
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
    }
})

export default MobaView