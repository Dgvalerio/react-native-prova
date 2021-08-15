import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Home: undefined;
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

// Page -> Forgot Password
export type ForgotPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ForgotPassword'
>;
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;
export type ForgotPasswordProps = {
  route: ForgotPasswordScreenRouteProp;
  navigation: ForgotPasswordScreenNavigationProp;
};

// Page -> Reset Password
export type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ResetPassword'
>;
export type ResetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;
export type ResetPasswordProps = {
  route: ResetPasswordScreenRouteProp;
  navigation: ResetPasswordScreenNavigationProp;
};

// Page -> Home
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type HomeProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};
