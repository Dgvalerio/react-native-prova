import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

// Page -> Sign In
export type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;
export type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;
export type SignInProps = {
  route: SignInScreenRouteProp;
  navigation: SignInScreenNavigationProp;
};

// Page -> Sign Up
export type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;
export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;
export type SignUpProps = {
  route: SignUpScreenRouteProp;
  navigation: SignUpScreenNavigationProp;
};
