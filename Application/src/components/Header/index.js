import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

const Header = ({
    title = "",
    left = true,
    right = false,
    color = 'transparent'
}) => {
    const navigation = useNavigation()

    return (
        <View style={[styles.headerStyle, { backgroundColor: color }]}>
            {
                left ? <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-thin-left" size={24} color="black" />
                </TouchableOpacity>
                    : <View></View>
            }
            <Text style={styles.textHeaderStyle}>{title}</Text>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        height: hp('10%'),
        backgroundColor: 'pink'
    },
    headerStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: wp('5%')
    },
    textHeaderStyle: {
        color: 'black',
        fontSize: 24
    },
})

export default Header