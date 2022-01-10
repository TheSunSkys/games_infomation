import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import IconLoni from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import HomeScreen from '@screens/home';
import SettingScreen from '@screens/setting';
import GameScreen from '@screens/game';

const TabNavigate = () => {
  const { colors } = useTheme();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const sizeFocused = focused ? size + 4 : size;
          if (route.name === 'Home') {
            return <Icon
              name="home"
              size={sizeFocused}
              color={focused ? colors.TEXT_ACTIVE : colors.TEXT_UNACTIVE}
            />;
          } else if (route?.name === 'Games') {
            return (
              <Icon
                name="game-controller"
                size={sizeFocused}
                color={focused ? colors.TEXT_ACTIVE : colors.TEXT_UNACTIVE}
              />
            );
          } else if (route?.name === 'Setting') {
            return (
              <IconLoni
                name="settings-sharp"
                size={sizeFocused}
                color={focused ? colors.TEXT_ACTIVE : colors.TEXT_UNACTIVE}
              />
            );
          }
          return null;
        },
        tabBarActiveTintColor: colors.TEXT_ACTIVE,
        tabBarInactiveTintColor: colors.TEXT_UNACTIVE,
        keyboardHidesTabBar: false,
        tabBarShowLabel: false,
        style: {
          position: 'absolute',
        },
        tabBarStyle: {
          shadowColor: 'transparent',
          borderTopWidth: 0,
          backgroundColor: colors.BACKGROUND_COMPONENT,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10
        }
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
