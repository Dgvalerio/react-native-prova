import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Text from '../components/Text';
import { back } from '../services/api';
import { signOut, updateUser } from '../store/auth/actions';
import {
  accountHeader,
  titleButton,
  title,
  titleButtonText,
  buttonText,
  deleteButton,
  confirmButton,
  deleteButtonText,
  confirmButtonText,
  buttonsRow,
  form,
  inputOn,
  inputOff,
  textError,
  titleButtonTextDanger,
} from '../styles/account';
import {
  inputError,
  passwordInputIcon,
  passwordInputRow,
} from '../styles/authentication';
import { theme, main } from '../styles/global';
import { AccountProps } from '../types/navigation';
import { checkEmailIsValid, handleError } from '../utils';

const Account: FC<AccountProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordSecureEntry, setPasswordSecureEntry] = useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordConfirmationSecureEntry, setPasswordConfirmationSecureEntry] =
    useState(true);

  const loadUser = useCallback(() => {
    if (!user) return;
    setEmail(user.email);
    setName(user.name);
  }, [user]);

  useEffect(() => {
    loadUser();
  }, [loadUser, user]);

  let passwordsMatch = false;

  const handleSubmit = async () => {
    if (!user) return;

    if (!email || !name) {
      alert('Preencha todos os campos!');
      return;
    }

    if (!checkEmailIsValid(email)) {
      alert('Insira um e-mail válido!');
      return;
    }

    if (
      isEditingPassword &&
      (!newPassword || !confirmNewPassword || !passwordsMatch)
    ) {
      alert('Nova senha inválida!');
      return;
    }

    const data: {
      id: number;
      name?: string;
      email?: string;
      password?: string;
      password_confirmation?: string;
      id_admin?: boolean;
    } = {
      id: user.id,
    };
    if (user.name !== name) data.name = name;
    if (user.email !== email) data.email = email;
    if (isEditingPassword) {
      data.password = newPassword;
      data.password_confirmation = confirmNewPassword;
    }

    back.users
      .update(data)
      .then(async ({ data: response }) => {
        await dispatch(
          updateUser({
            id: response.id,
            name: response.name,
            email: response.email,
            isAdmin: response.is_admin,
          })
        );
        alert('Usuário atualizado com sucesso!');
        setIsEditing(false);
        setIsEditingPassword(false);
      })
      .catch((error) => handleError(error, 'Erro ao atualizar usuário!'));
  };

  if (!user)
    return (
      <Container>
        <Header navigation={navigation} />
        <View style={main}>
          <Text style={title}>Account</Text>
          <Text>Você não está logado!</Text>
        </View>
        <Footer />
      </Container>
    );

  const handleToggleEdit = () => setIsEditing((prevState) => !prevState);
  const handleToggleEditPassword = () =>
    setIsEditingPassword((prevState) => !prevState);

  const handleDeleteAccount = () =>
    Alert.alert('Você tem certeza?', 'Essa ação não poderá ser desfeita!', [
      { text: 'Não, cancele!', style: 'cancel' },
      {
        text: 'Sim, delete!',
        onPress: () =>
          back.users
            .delete({ id: user.id })
            .then(async () =>
              Alert.alert(
                'Usuário deletado com sucesso!',
                'Você será redirecionado agora.',
                [
                  {
                    text: 'OK',
                    onPress: () => dispatch(signOut()),
                  },
                ]
              )
            )
            .catch((error) =>
              handleError(error, 'Houve um problema ao deletar o usuário.')
            ),
      },
    ]);

  const togglePasswordSecureEntry = () =>
    setPasswordSecureEntry((prev) => !prev);

  const togglePasswordConfirmationSecureEntry = () =>
    setPasswordConfirmationSecureEntry((prev) => !prev);

  passwordsMatch =
    isEditing && isEditingPassword ? newPassword === confirmNewPassword : true;

  return (
    <Container>
      <Header navigation={navigation} />
      <View style={main}>
        <View style={accountHeader}>
          <Text style={title}>Account</Text>
          <TouchableOpacity onPress={handleToggleEdit} style={titleButton}>
            <Text style={isEditing ? titleButtonTextDanger : titleButtonText}>
              {isEditing ? 'Cancel edit ' : 'Edit data '}
            </Text>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={26}
              color={isEditing ? theme.colors.danger : theme.colors.textColor}
            />
          </TouchableOpacity>
        </View>
        <View style={form}>
          <TextInput
            style={isEditing ? inputOn : inputOff}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            editable={isEditing}
          />
          <TextInput
            style={isEditing ? inputOn : inputOff}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            editable={isEditing}
          />
          {isEditing && isEditingPassword && (
            <View style={passwordInputRow}>
              <TextInput
                style={passwordsMatch ? inputOn : inputError}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Password"
                placeholderTextColor={
                  passwordsMatch ? theme.colors.textColor : theme.colors.danger
                }
                secureTextEntry={passwordSecureEntry}
              />
              <TouchableOpacity
                onPress={togglePasswordSecureEntry}
                style={passwordInputIcon}
              >
                <Feather
                  name={passwordSecureEntry ? 'eye-off' : 'eye'}
                  size={24}
                  color={
                    passwordsMatch
                      ? theme.colors.textColor
                      : theme.colors.danger
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          {isEditing && isEditingPassword && (
            <View style={passwordInputRow}>
              <TextInput
                style={passwordsMatch ? inputOn : inputError}
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                placeholder="Password Confirmation"
                placeholderTextColor={
                  passwordsMatch ? theme.colors.textColor : theme.colors.danger
                }
                secureTextEntry={passwordConfirmationSecureEntry}
              />
              <TouchableOpacity
                onPress={togglePasswordConfirmationSecureEntry}
                style={passwordInputIcon}
              >
                <Feather
                  name={passwordConfirmationSecureEntry ? 'eye-off' : 'eye'}
                  size={24}
                  color={
                    passwordsMatch
                      ? theme.colors.textColor
                      : theme.colors.danger
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          {!passwordsMatch && (
            <Text style={textError}>Passwords don&apos;t Match!</Text>
          )}
          {isEditing && (
            <TouchableOpacity onPress={handleToggleEditPassword}>
              {isEditingPassword ? (
                <Text style={buttonText}>
                  Cancel edit password{' '}
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={24}
                    color={theme.colors.textColor}
                  />
                </Text>
              ) : (
                <Text style={buttonText}>
                  Edit password{' '}
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={24}
                    color={theme.colors.textColor}
                  />
                </Text>
              )}
            </TouchableOpacity>
          )}
          {isEditing && (
            <View style={buttonsRow}>
              <TouchableOpacity
                disabled={isEditingPassword && !passwordsMatch}
                onPress={handleDeleteAccount}
                style={deleteButton}
              >
                <Feather name="trash-2" size={20} color={theme.colors.danger} />
                <Text style={deleteButtonText}> Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isEditingPassword && !passwordsMatch}
                onPress={handleSubmit}
                style={confirmButton}
              >
                <Text style={confirmButtonText}>Update </Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={24}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Footer />
      </View>
    </Container>
  );
};

export default Account;
