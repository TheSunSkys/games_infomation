import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.viewContainer}>
            <Text>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default SplashScreen;
