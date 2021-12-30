import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import Header from '@components/Header'
import SettingCard from '@components/SettingCard';
import { AuthContext } from '@navigation/auth';

const SettingScreen = ({ navigation }) => {
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
    <View>
      <Header title={"Setting"} left={false} color={'#FFFFFF'} />
      <FlatList
        data={settings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SettingScreen;
