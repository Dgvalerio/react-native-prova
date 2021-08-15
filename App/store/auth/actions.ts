import { Dispatch } from 'react';

import { Action } from '@reduxjs/toolkit';

import { back } from '../../services/api';
import { handleError } from '../../utils';
import { hideLoading } from '../ui/actions';
import { actions } from './slice';

const { signInSuccess, signOut, updateUser } = actions;

const signIn =
  (email: string, password: string) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const { data } = await back.auth.signIn({ email, password });

      await dispatch(
        signInSuccess({
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            isAdmin: data.user.is_admin,
          },
          token: data.token,
        })
      );
    } catch (error) {
      handleError(error, 'Erro ao realizar login!');
    } finally {
      await dispatch(hideLoading());
    }
  };

const signUp =
  (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const { data } = await back.users.create({
        name,
        email,
        password,
        password_confirmation,
      });

      const { data: autoSignIn } = await back.auth.signIn({
        email: data.email,
        password,
      });

      await dispatch(
        signInSuccess({
          user: {
            id: autoSignIn.user.id,
            name: autoSignIn.user.name,
            email: autoSignIn.user.email,
            isAdmin: autoSignIn.user.is_admin,
          },
          token: autoSignIn.token,
        })
      );
    } catch (error) {
      handleError(error, 'Erro ao realizar o cadastro!');
    } finally {
      await dispatch(hideLoading());
    }
  };

const resetPassword =
  (password: string, password_confirmation: string, token: string) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const { data } = await back.users.password.reset({
        password,
        password_confirmation,
        token,
      });

      alert('Senha atualizada com sucesso!');

      const { data: autoSignIn } = await back.auth.signIn({
        email: data.email,
        password,
      });

      await dispatch(
        signInSuccess({
          user: {
            id: autoSignIn.user.id,
            name: autoSignIn.user.name,
            email: autoSignIn.user.email,
            isAdmin: autoSignIn.user.is_admin,
          },
          token: autoSignIn.token,
        })
      );
    } catch (error) {
      handleError(error, 'Erro ao atualizar login!');
    } finally {
      await dispatch(hideLoading());
    }
  };

const forgotPassword =
  (email: string) =>
  async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      await back.users.password.forgot({ email });

      alert('Um link foi enviado para seu endereço de e-mail!');
    } catch (error) {
      handleError(error, 'Erro ao enviar e-mail!');
    } finally {
      await dispatch(hideLoading());
    }
  };

export {
  signIn,
  signUp,
  resetPassword,
  forgotPassword,
  updateUser,
  signInSuccess,
  signOut,
};
