import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import IconLoni from 'react-native-vector-icons/Ionicons';
import HomeScreen from '@screens/home';
import SettingScreen from '@screens/setting';
import GameScreen from '@screens/game';

const TabNavigate = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const sizeFocused = focused ? size + 4 : size;
          if (route.name === 'Home') {
            return <Icon name="home" size={sizeFocused} color="black" />;
          } else if (route?.name === 'Games') {
            return (
              <Icon name="game-controller" size={sizeFocused} color="black" />
            );
          } else if (route?.name === 'Setting') {
            return (
              <IconLoni
                name="settings-sharp"
                size={sizeFocused}
                color="black"
              />
            );
          }
          return null;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        keyboardHidesTabBar: false,
        style: {
          position: 'absolute',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Tab.Screen
        name="Games"
        component={GameScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigate;
