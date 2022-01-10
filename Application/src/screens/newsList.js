import React, { useMemo, useState } from "react"
import { View, StyleSheet, FlatList, ScrollView } from "react-native"
import Header from "@components/Header";
import { clientNews } from "@utils/cilent";
import CardNewsVertical from "@components/CardNewsVertical"
import CardNewsVerticalPlaceholder from "@components/CardNewsVerticalPlaceholder"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NewsList = ({ route, navigation }) => {
    const { type } = route?.params
    const [placeholderCount, setPlaceholderCount] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [isNews, setIsNews] = useState([])

    const getSteamNews = async () => {
        try {
            if (type === 'steam') {
                const { data } = await clientNews.getSteamNews(10)
                setIsNews(data?.articles)
            } else if (type === 'epic') {
                const { data } = await clientNews.getEpicNews(10)
                setIsNews(data?.articles)
            } else if (type === 'other') {
                const { data } = await clientNews.getOtherNews(10)
                setIsNews(data?.articles)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderItem = ({ item, index }) => {
        console.log(index)
        return (
            <CardNewsVertical
                key={index}
                image={item?.image}
                publishedAt={item?.publishedAt}
                title={item?.title}
                index={index}
            />
        )
    }

    useMemo(() => {
        getSteamNews()
    }, [])

    return (
        <View style={styles.viewContainer}>
            <Header title={`${type} News`} />
            {
                isNews?.length > 0 ? <FlatList
                    style={styles.viewContent}
                    data={isNews}
                    renderItem={renderItem}
                    keyExtractor={item => item.url}
                />
                    : <ScrollView
                        style={styles.viewContent}
                        showsVerticalScrollIndicator={false}>
                        {
                            placeholderCount.map((_, index) => {
                                return (
                                    <CardNewsVerticalPlaceholder key={index} />
                                )
                            })
                        }
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1
    },
    viewContent: {
        paddingTop: hp('2%'),
    }
})

export default NewsList