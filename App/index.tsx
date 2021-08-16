import React, { FC } from 'react';
import { View } from 'react-native';
import { Provider, useSelector } from 'react-redux';

import {
  SimpleLineIcons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from './components/Loading';
import Text from './components/Text';
import Account from './screens/Account';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';
import NewBet from './screens/NewBet';
import ResetPassword from './screens/ResetPassword';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import store from './store';
import {
  iconTab,
  iconText,
  megaIcon,
  activeIconText,
  ativeBorder,
} from './styles/bottomTab';
import { theme } from './styles/global';
import { AuthStackParamList, RootStackParamList } from './types/navigation';

const Tab = createBottomTabNavigator<AuthStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigation: FC = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 71,
        alignItems: 'flex-start',
      },
    }}
  >
    <Tab.Screen
      name="RecentGames"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={iconTab}>
            <View style={ativeBorder} />
            <SimpleLineIcons
              name="home"
              size={24}
              color={focused ? theme.colors.primary : '#C1C1C1'}
            />
            <Text style={focused ? activeIconText : iconText}>Home</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="NewBet"
      component={NewBet}
      options={{
        headerShown: false,
        tabBarIcon: () => (
          <View style={megaIcon}>
            <MaterialIcons name="attach-money" size={40} color="white" />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={iconTab}>
            <View style={ativeBorder} />
            <FontAwesome
              name="user-o"
              size={24}
              color={focused ? theme.colors.primary : '#C1C1C1'}
            />
            <Text style={focused ? activeIconText : iconText}>Account</Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const Navigation: FC = () => {
  const { signed } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);

  if (loading) return <Loading />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={signed ? 'Home' : 'SignIn'}>
        {signed ? (
          <>
            <Stack.Screen
              name="Home"
              component={AuthNavigation}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: FC = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
