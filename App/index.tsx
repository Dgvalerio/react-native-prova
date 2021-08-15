import React, { FC } from 'react';
import { Provider, useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from './components/Loading';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';
import ResetPassword from './screens/ResetPassword';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import store from './store';
import { RootStackParamList } from './types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

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
              component={Home}
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
