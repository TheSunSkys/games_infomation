import React from "react"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListItem } from 'react-native-elements'

const SettingCard = ({
    title,
    textColor,
    onPass = () => { }
}) => {
    return (
        <ListItem
            onPress={onPass}
            bottomDivider
        >
            <Icon name="logout" size={24} color={textColor === 'red' ? textColor : "black"} />
            <ListItem.Content>
                <ListItem.Title style={{ color: textColor }}>{title}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

export default SettingCard