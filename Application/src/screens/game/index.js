import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Header from '@components/Header'
import { SearchBar } from 'react-native-elements';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GameList from "@components/GameList";
import GameCard from "@components/GameCard";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from '@react-navigation/native';

const GameScreen = () => {
    const { colors } = useTheme()
    const navigation = useNavigation()
    const [search, setSearch] = useState([])
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [viewGameList, setViewGameList] = useState(false);

    const getWindowWidth = () =>
        Math.round(Dimensions.get('window').width * 1000) / 1000 - 6;

    const searchFilter = (text) => {
        console.log('text: ', text)
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData ? newData : []);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    }

    useEffect(() => {
        const mock = [
            {
                id: 1,
                logo: require('@assets/image/lol.png'),
                title: 'League Of Legends',
                type: 'moba',
                story: '',
                source: ''
            },
            {
                id: 2,
                logo: require('@assets/image/dota2.png'),
                title: 'Dota2',
                type: 'moba',
                story: 'The magical Dota 2 universe once had two otherworldly creatures at odds with each other. Their fights and quarrels caused great pain to the people living there, which is why the Primordials, even greater beings, decided to lock them up in a prison. This place was known as the ‘Mad Moon’. The two creatures decided to lay their differences to rest until they found a way out – which they soon did. Their escape caused the destruction of the Mad Moon and they soon fell to the planet below, bringing along all sorts of magical and fantastical fragments. Suddenly, the planet’s inhabitants had mana, protection, they could even attempt to resurrect others!                ',
                source: 'https://bitspawn.gg/dota-2-lore-the-story-behind-the-game/'
            },
            {
                id: 3,
                logo: require('@assets/image/rov.png'),
                title: 'Arena of Valor(RoV)',
                type: 'moba',
                story: `Athanor was a world where the faith in heavenly beings had vanished and lawlessness prevailed. Creatures of unspeakable horror ran amok with no sign of the world ever being saved from its suffering. Its citizens began to lose hope. Until a brave soul stood up against this darkness. His name was Arthur. Arthur was a young promising knight who sought to overcome the impossible by restoring order to the world he loved dearly. He walked tall with a sword of justice in his hand and righteousness in his heart. Arthur preached the principles of justice and honor, heading down the path of discipline as a knight. He built up an order, recruiting brave men from far and wide to rally against the demons that plagued them. Arthur raised humanity’s morale once more and built up peace and order amidst the darkness. Under Arthur’s leadership, the Order impeded the Demon Legion’s advance. This aggravated Ravanor’s leader, Maloch. Realizing that Arthur was a threat to his rule, he began to overwhelm the Order, but Arthur and his knights were not shaken. They would not be defeated. The Order kept growing, their numbers increasing with each battle until they became a force to be reckoned with. Victory eventually came, the Order driving back the demons to whence they came. Arthur and his men brought mankind a place in the world, a place where they were finally recognized as equals rather than as beneath the other races. This was all the beginning of a road to finding peace.`,
                source: 'https://samurai-gamers.com/arena-of-valor/the-lore-of-arena-of-valor/'
            },
        ]
        setMasterDataSource(mock)
        setFilteredDataSource(mock)
    }, [])

    const renderItem = (type, data) => {
        if (!viewGameList) {
            return (
                <GameCard
                    image={data?.logo}
                    onPress={() => {
                        navigation.navigate('GameDetailScreen', {
                            type: data?.type,
                            id: data?.id,
                            name: data?.title,
                            image: data?.logo,
                            story: data?.story,
                            source: data?.source
                        })
                    }} />
            )
        } else {
            return (
                <GameList
                    title={data?.title}
                    image={data?.logo}
                    onPress={() => {
                        navigation.navigate('GameDetailScreen', {
                            type: data?.type,
                            id: data?.id,
                            name: data?.title,
                            image: data?.logo,
                            story: data?.story,
                            source: data?.source
                        })
                    }}
                />
            )
        }
    }

    const dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    }).cloneWithRows(filteredDataSource);

    const layoutProvider = new LayoutProvider(
        index => index,
        (type, dim) => {
            if (!viewGameList) {
                dim.width = getWindowWidth() / 3
                dim.height = getWindowWidth() / 3
            } else {
                dim.width = getWindowWidth()
                dim.height = 51 + 16
            }
        },
    );

    return (
        <View style={[styles.viewContainer, { backgroundColor: colors?.BACKGROUND }]}>
            <Header left={false} title={'Games'} />
            <View style={styles.viewContainer}>
                <View style={styles.viewContent}>
                    <SearchBar
                        round
                        searchIcon={{ size: 24 }}
                        onChangeText={(text) => searchFilter(text)}
                        onClear={(text) => searchFilter('')}
                        placeholder="Type Here..."
                        value={search}
                        lightTheme={true}
                        containerStyle={styles.search}
                        inputContainerStyle={{ backgroundColor: colors?.BACKGROUND_COMPONENT }}
                    />
                    <TouchableOpacity
                        onPress={() => setViewGameList(!viewGameList)}
                        style={styles.icon}>
                        <Icon name={!viewGameList ? "list" : "grid"} size={24} color={colors?.BACKGROUND_COMPONENT} />
                    </TouchableOpacity>
                </View>
                {
                    filteredDataSource.length > 0 &&
                    <RecyclerListView
                        dataProvider={dataProvider}
                        layoutProvider={layoutProvider}
                        rowRenderer={renderItem}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1
    },
    icon: {
        width: wp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        paddingRight: 0,
        width: wp('85%'),
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    viewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: wp('2.5%'),
    }
})

export default GameScreen