import React from "react"
import { StyleSheet, View } from "react-native";
import { ListItem, Avatar } from 'react-native-elements'
import { fontSize } from "@utils/constant";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';

const GameList = ({
    title,
    image,
    onPress = () => { }
}) => {
    const { colors } = useTheme()

    return (
        <ListItem
            onPress={onPress}
            containerStyle={{ padding: 8, backgroundColor: colors.BACKGROUND_COMPONENT }}
            bottomDivider
        >
            <View style={styles.viewItem}>
                <Avatar
                    avatarStyle={{ borderRadius: 5 }}
                    size={50}
                    source={image ? image : null}
                    key={`11`}
                    title={title?.substring(0, 2)}
                    containerStyle={{ backgroundColor: !image ? colors.BACKGROUND_COMPONENT : 'transparent' }}
                />
                <ListItem.Content>
                    <ListItem.Title style={[styles.textTilte, { color: colors.TEXT_TITLE }]}>{title}</ListItem.Title>
                </ListItem.Content>
            </View>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    viewItem: {
        paddingHorizontal: wp('4%'),
        flexDirection: 'row',
    },
    textTilte: {
        paddingLeft: wp('4%'),
        fontSize: fontSize.md
    }
})

export default GameList