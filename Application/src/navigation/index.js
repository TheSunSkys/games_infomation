import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from './auth';
import TabNavigate from './TabNavigation';
import SplashScreen from '@screens/splash';
import LoginScreen from '@screens/auth/login';
import RegisterScreen from '@screens/auth/register';
import NewsList from '@screens/newsList';
import NewsDetail from '@screens/newsDetail';
import GameDetail from '@screens/game/detail';

import { colors } from '@assets/styles/colors';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors.dark
  }
};

const Navigation = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const token = 'dummy-auth-token';
        AsyncStorage.setItem('TOKEN', token);
        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: () => {
        AsyncStorage.removeItem('TOKEN')
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('TOKEN');
      } catch (e) {
        // Restoring token failed
        dispatch({ type: 'SIGN_OUT' });
      }
      setTimeout(() => {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      }, 1000);
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName={state && state.userToken && 'InitScreen'}>
          {state && state.isLoading ? (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Group>
          ) : state && state.userToken == null ? (
            <Stack.Group
              screenOptions={{
                headerShown: false,
                animation: 'none',
              }}>
              <Stack.Screen name="LoginScreen">
                {props => (
                  <>
                    <SafeAreaView style={{ flex: 1 }}>
                      <LoginScreen {...props} />
                    </SafeAreaView>
                  </>
                )}
              </Stack.Screen>
              <Stack.Screen name="RegisterScreen">
                {props => (
                  <>
                    <SafeAreaView style={{ flex: 1 }}>
                      <RegisterScreen {...props} />
                    </SafeAreaView>
                  </>
                )}
              </Stack.Screen>
            </Stack.Group>
          ) : (
            <Stack.Group
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: {
                  backgroundColor: colors.dark.BACKGROUND,
                }
              }}>
              <Stack.Screen name="InitScreen" component={TabNavigate} />
              <Stack.Screen name="NewsListScreen" component={NewsList} />
              <Stack.Screen name="NewsDetailScreen" component={NewsDetail} />
              <Stack.Screen name="GameDetailScreen" component={GameDetail} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
