import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SettingScreen = () => {
  return (
    <View style={styles.viewContainer}>
      <Text>Setting Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingScreen;
