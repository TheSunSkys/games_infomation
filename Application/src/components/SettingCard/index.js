import React from "react"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements'
import { fontSize } from "@utils/constant";
import { useTheme } from '@react-navigation/native';

const SettingCard = ({
    title,
    textColor,
    onPass = () => { }
}) => {
    const { colors } = useTheme()

    return (
        <ListItem
            containerStyle={{ backgroundColor: colors?.BACKGROUND_COMPONENT }}
            onPress={onPass}
            bottomDivider
        >
            <Icon name="logout" size={24} color={textColor === 'red' ? textColor : "black"} />
            <ListItem.Content>
                <ListItem.Title style={[styles.textTilte, { color: textColor }]}>{title}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    textTilte: {
        fontSize: fontSize.sm
    }
})

export default SettingCard