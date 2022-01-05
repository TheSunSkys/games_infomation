import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Header from '@components/Header'
import { SearchBar } from 'react-native-elements';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GameList from "@components/GameList";
import GameCard from "@components/GameCard";
import Icon from 'react-native-vector-icons/Feather';

const GameScreen = () => {
    const [search, setSearch] = useState([])
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [viewGameList, setViewGameList] = useState(true);

    const getWindowWidth = () =>
        Math.round(Dimensions.get('window').width * 1000) / 1000 - 6;

    const searchFilter = (text) => {
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
                logo: require('../assets/image/lol.png'),
                title: 'League Of Legends'
            },
            {
                logo: require('../assets/image/dota2.png'),
                title: 'Dota2'
            },
            {
                logo: require('../assets/image/rov.png'),
                title: 'Arena of Valor(RoV)'
            },
        ]
        setMasterDataSource(mock)
        setFilteredDataSource(mock)
    }, [])

    const renderItem = (type, data) => {
        if (!viewGameList) {
            return (
                <GameCard image={data?.logo} />
            )
        } else {
            return (
                <GameList title={data?.title} image={data?.logo} />
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
        <View style={{ flex: 1 }}>
            <Header left={false} title={'Games'} color={'#FFFFFF'} />
            <View style={styles.viewContainer}>
                <View style={{
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: wp('2.5%'),
                }}>
                    <SearchBar
                        round
                        searchIcon={{ size: 24 }}
                        onSubmitEditing={(text) => searchFilter(text)}
                        onClear={(text) => searchFilter('')}
                        placeholder="Type Here..."
                        value={search}
                        lightTheme={true}
                        containerStyle={styles.search}
                        inputContainerStyle={{ backgroundColor: '#CFCFCF' }}
                    />
                    <TouchableOpacity
                        onPress={() => setViewGameList(!viewGameList)}
                        style={styles.icon}>
                        <Icon name={!viewGameList ? "list" : "grid"} size={24} color="black" />
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
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
        borderBottomWidth: 0
    }
})

export default GameScreen