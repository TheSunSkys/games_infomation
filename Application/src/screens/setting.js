import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '@components/Header'
import SettingCard from '@components/SettingCard';
import { AuthContext } from '@navigation/auth';
import { useTheme } from '@react-navigation/native';

const SettingScreen = ({ navigation }) => {
  const { colors } = useTheme()
  const { signOut } = useContext(AuthContext);
  const settings = [
    {
      id: 1,
      title: 'Logout',
      color: 'red',
      onPass: () => signOut()
    }
  ]

  const renderItem = ({ item }) => (
    <SettingCard
      title={item?.title}
      textColor={item?.color}
      onPass={item?.onPass}
    />
  )

  return (
    <View style={[styles.viewContainer, { backgroundColor: colors?.BACKGROUND }]}>
      <Header title={"Setting"} left={false} />
      <FlatList
        style={styles.flatList}
        data={settings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  flatList: {
    marginTop: 8
  }
})

export default SettingScreen;
