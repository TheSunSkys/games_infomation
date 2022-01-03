import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { clientNews } from "@utils/cilent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardNewsHorizon from "@components/CardNewsHorizon";
import CradNewsHorizonPlaceholder from "@components/CradNewsHorizonPlaceholder";
import CardNewsVertical from "@components/CardNewsVertical";
import CardNewsVerticalPlaceholder from '@components/CardNewsVerticalPlaceholder'
import { useNavigation } from "@react-navigation/native";
import { fontSize } from "@utils/constant";

const mockData = [
    {
        "content": `Message games December 28, 2021, 10:16 The tests of Regiments, the military RTS, which will be released by MicroProse, have started on Steam. We have good news for the players waiting for Regiments, a realistic war RTS by Bird’s Eye Games studio. Tes... [1881 chars]", "description": "Message games December 28, 2021, 10:16 The tests of Regiments, the military RTS, which will be released by MicroProse, have started on Steam. We have good news for the players waiting for Regiments, a realistic war RTS by Bird’s Eye Games studio. Testing of an early version of the game has started on Steam. Currently, …`,
        "image": "https://www.gry-online.pl/i/h/22/378381244.jpg",
        "publishedAt": "2021-12-28T09:57:14Z",
        "source": {
            "name": "Spark Chronicles",
            "url": "https://sparkchronicles.com"
        },
        "title": "Regiments - the war RTS to test for free on Steam",
        "url": "https://sparkchronicles.com/regiments-the-war-rts-to-test-for-free-on-steam/"
    }
]

const HomeScreen = () => {
    const navigation = useNavigation()
    const [placeholderCount, setPlaceholderCount] = useState([1, 2, 3, 4, 5])
    const [isSteamNews, setSteamNews] = useState([])
    const [isEpicNews, setEpicNews] = useState([])
    const [isOtherNews, setOtherNews] = useState([])
    const getNews = async () => {
        try {
            const { data: steamNews } = await clientNews.getSteamNews(5)
            const { data: epicNews } = await clientNews.getEpicNews(5)
            const { data: otherNews } = await clientNews.getOtherNews(5)
            // console.log('response: ', steamNews?.articles[0].content)
            setSteamNews(steamNews?.articles)
            setEpicNews(epicNews?.articles)
            setOtherNews(otherNews?.articles)
        } catch (error) {
            console.log(error)
        }
    }

    useMemo(() => {
        getNews()
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.viewScroll}>
            <View style={styles.viewContainer}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Steam</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('NewsListScreen', { type: 'steam' })}>
                        <Text style={styles.textRight}>More {'>>'}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        isSteamNews && isSteamNews.length > 0 ? isSteamNews.map((news, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => navigation.navigate('NewsDetailScreen', { data: news })}>
                                    <CardNewsHorizon
                                        key={index}
                                        image={news?.image}
                                        publishedAt={news?.publishedAt}
                                        title={news?.title}
                                        index={index}
                                    />
                                </TouchableOpacity>
                            )
                        })
                            : placeholderCount.map((_, index) => {
                                return (
                                    <CradNewsHorizonPlaceholder key={index} index={index} />
                                )
                            })
                    }
                </ScrollView>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Epic</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('NewsListScreen', { type: 'epic' })}>
                        <Text style={styles.textRight}>More {'>>'}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        isEpicNews && isEpicNews.length > 0 ? isEpicNews.map((news, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => navigation.navigate('NewsDetailScreen', { data: news })}>
                                    <CardNewsHorizon
                                        key={index}
                                        image={news?.image}
                                        publishedAt={news?.publishedAt}
                                        title={news?.title}
                                        index={index}
                                    />
                                </TouchableOpacity>
                            )
                        })
                            : placeholderCount.map((_, index) => {
                                return (
                                    <CradNewsHorizonPlaceholder key={index} index={index} />
                                )
                            })
                    }
                </ScrollView>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Other</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('NewsListScreen', { type: 'other' })}>
                        <Text style={styles.textRight}>More {'>>'}</Text>
                    </TouchableOpacity>
                </View>
                {
                    isOtherNews && isOtherNews.length > 0 ? isOtherNews.map((news, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('NewsDetailScreen', { data: news })}>
                                <CardNewsVertical
                                    key={index}
                                    image={news?.image}
                                    publishedAt={news?.publishedAt}
                                    title={news?.title} />
                            </TouchableOpacity>
                        )
                    })
                        : placeholderCount.map((_, index) => {
                            return (
                                <CardNewsVerticalPlaceholder key={index} />
                            )
                        })
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewScroll: {
        flex: 1,
    },
    viewScroll: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        marginTop: hp('2%'),
    },
    textTitle: {
        fontSize: fontSize.xl
    },
    textRight: {
        fontSize: fontSize.sm
    },
    viewTitle: {
        paddingHorizontal: wp('5%'),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})

export default HomeScreen