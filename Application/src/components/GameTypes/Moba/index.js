import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { Tab, Text, TabView } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';

import MobaHeroCard from "@components/MobaHeroCard"
import { fontSize } from "@utils/constant";

const MobaView = ({ allHero }) => {
    const { colors } = useTheme()
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
        return <MobaHeroCard image={data?.heroid} />
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
                <TabView.Item style={styles.tabView}>
                    <Text style={{ color: colors?.TEXT_ACTIVE }}>Cart</Text>
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