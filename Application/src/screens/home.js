import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { clientNews } from "@utils/cilent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardNewsHorizon from "@components/CardNewsHorizon";
import CradNewsHorizonPlaceholder from "@components/CradNewsHorizonPlaceholder";
import CardNewsVertical from "@components/CardNewsVertical";
import CardNewsVerticalPlaceholder from '@components/CardNewsVerticalPlaceholder'

const HomeScreen = () => {
    const [placeholderCount, setPlaceholderCount] = useState([1, 2, 3, 4, 5])
    const [isSteamNews, setSteamNews] = useState([])
    const [isEpicNews, setEpicNews] = useState([])
    const [isOtherNews, setOtherNews] = useState([])
    const getNews = async () => {
        try {
            const { data: steamNews } = await clientNews.getSteamNews()
            const { data: epicNews } = await clientNews.getEpicNews()
            const { data: otherNews } = await clientNews.getOtherNews()
            // console.log('response: ', steamNews?.articles[0])
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
        <ScrollView style={styles.viewScroll}>
            <View style={styles.viewContainer}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Steam</Text>
                    <Text style={styles.textRight}>More {'>>'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        isSteamNews && isSteamNews.length > 0 ? isSteamNews.map((news, index) => {
                            return (
                                <CardNewsHorizon
                                    key={index}
                                    image={news?.image}
                                    publishedAt={news?.publishedAt}
                                    title={news?.title}
                                    index={index}
                                />
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
                    <Text style={styles.textRight}>More {'>>'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        isEpicNews && isEpicNews.length > 0 ? isEpicNews.map((news, index) => {
                            return (
                                <CardNewsHorizon
                                    key={index}
                                    image={news?.image}
                                    publishedAt={news?.publishedAt}
                                    title={news?.title}
                                    index={index}
                                />
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
                    <Text style={styles.textRight}>More {'>>'}</Text>
                </View>
                {
                    isOtherNews && isOtherNews.length > 0 ? isOtherNews.map((news, index) => {
                        return (
                            <CardNewsVertical
                                key={index}
                                image={news?.image}
                                publishedAt={news?.publishedAt}
                                title={news?.title} />
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
        fontSize: hp('4%')
    },
    textRight: {
        fontSize: hp('2%')
    },
    viewTitle: {
        paddingHorizontal: wp('5%'),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})

export default HomeScreen