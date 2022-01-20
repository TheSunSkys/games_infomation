import React from "react"
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import { fontSize } from "@utils/constant";
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const Header = ({
    title = null,
    left = true,
    right = false,
    color = 'transparent'
}) => {
    const { colors } = useTheme()
    const navigation = useNavigation()

    return (
        <>
            <StatusBar animated={true} backgroundColor={title && !left ? colors?.BACKGROUND_COMPONENT : '#121212'} />
            <View style={
                [
                    styles.headerStyle,
                    {
                        backgroundColor: title && !left ? colors?.BACKGROUND_COMPONENT : 'transparent',
                        justifyContent: left && title ? 'flex-start' : 'space-between',
                    }
                ]}>
                {
                    left ? <TouchableOpacity style={{ marginRight: 10, padding: 5 }} onPress={() => navigation.goBack()}>
                        {/* <Icon name="chevron-thin-left" size={24} color={colors?.TEXT_ACTIVE} /> */}
                        <Icon
                            size={24}
                            // reverse
                            name='chevron-thin-left'
                            type='entypo'
                            color={colors?.BACKGROUND_COMPONENT}
                        // backgroundColor={colors?.BACKGROUND}
                        />
                    </TouchableOpacity>
                        : <View></View>
                }
                {
                    title ? <Text style={[styles.textHeaderStyle, { color: colors?.TEXT_ACTIVE }]}>{title}</Text> : <View></View>
                }
                <View></View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        height: hp('9%'),
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: wp('3%'),
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    textHeaderStyle: {
        fontSize: fontSize.xl
    },
})

export default Header