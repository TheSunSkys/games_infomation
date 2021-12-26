import React, {useEffect, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthContext} from './auth';
import TabNavigate from './TabNavigation';
import HomeScreen from '../screens/home';
import SplashScreen from '../screens/splash';
import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';

const Stack = createNativeStackNavigator();

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
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
      setTimeout(() => {
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      }, 1000);
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state && state.isLoading ? (
            <Stack.Group screenOptions={{headerShown: false}}>
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
                    <SafeAreaView style={{flex: 1}}>
                      <LoginScreen {...props} />
                    </SafeAreaView>
                  </>
                )}
              </Stack.Screen>
              <Stack.Screen name="RegisterScreen">
                {props => (
                  <>
                    <SafeAreaView style={{flex: 1}}>
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
              }}>
              <Stack.Screen name="Home" component={TabNavigate} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
