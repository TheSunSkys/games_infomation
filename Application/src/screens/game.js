import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GameScreen = () => {
    return (
        <View style={styles.viewContainer}>
            <Text>Game Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default GameScreen