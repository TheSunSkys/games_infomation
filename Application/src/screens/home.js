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
import Header from '@components/Header'
import { useTheme } from '@react-navigation/native';

const HomeScreen = () => {
    const { colors } = useTheme()
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
        <View style={{ flex: 1, backgroundColor: colors?.BACKGROUND }}>
            <Header left={false} title={'News'} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.viewScroll}>
                <View style={styles.viewContainer}>
                    <View style={styles.viewTitle}>
                        <Text style={[styles.textTitle, { color: colors?.TEXT_ACTIVE }]}>Steam</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('NewsListScreen', { type: 'steam' })}>
                            <Text style={[styles.textRight, { color: colors?.TEXT_ACTIVE }]}>More {'>>'}</Text>
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
                        <Text style={[styles.textTitle, { color: colors?.TEXT_ACTIVE }]}>Epic</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('NewsListScreen', { type: 'epic' })}>
                            <Text style={[styles.textRight, { color: colors?.TEXT_ACTIVE }]}>More {'>>'}</Text>
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
                    <View style={[styles.viewTitle, { marginBottom: 5 }]}>
                        <Text style={[styles.textTitle, { color: colors?.TEXT_ACTIVE }]}>Other</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('NewsListScreen', { type: 'other' })}>
                            <Text style={[styles.textRight, { color: colors?.TEXT_ACTIVE }]}>More {'>>'}</Text>
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
        </View>
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