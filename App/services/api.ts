/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios';

// WEB
const api = axios.create({ baseURL: 'https://go-bets-back.herokuapp.com' });

// LOCAL
// const api = axios.create({ baseURL: 'http://127.0.0.1:3333' });

const routes = {
  auth: `/sign-in`,
  users: `/users`,
  password: `/forgot-password`,
  types: `/types`,
  multiBets: `/bets`,
  bets: (typeId: number): string => `/types/${typeId}/bets`,
  promote: (userId: number): string => `/users/${userId}/promote`,
  demote: (userId: number): string => `/users/${userId}/demote`,
};

export const back = {
  routes,
  auth: {
    signIn: (data: {
      email: string;
      password: string;
    }): Promise<AxiosResponse> => api.post(routes.auth, data),
  },
  users: {
    create: (data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
      is_admin?: boolean;
    }): Promise<AxiosResponse> => api.post(routes.users, data),
    delete: ({ id }: { id: number }): Promise<AxiosResponse> =>
      api.delete(`${routes.users}/${id}`),
    index: ({
      page,
      limit,
    }: {
      page?: number;
      limit?: number;
    }): Promise<AxiosResponse> =>
      api.get(`${routes.users}?page=${page || 1}&limit=${limit || 10}`),
    show: ({ id }: { id: number }): Promise<AxiosResponse> =>
      api.get(`${routes.users}/${id}`),
    update: (data: {
      id: number;
      name?: string;
      email?: string;
      password?: string;
      password_confirmation?: string;
    }): Promise<AxiosResponse> => api.put(`${routes.users}/${data.id}`, data),
    password: {
      forgot: (data: { email: string }): Promise<AxiosResponse> =>
        api.post(routes.password, data),
      reset: (data: {
        token: string;
        password: string;
        password_confirmation: string;
      }): Promise<AxiosResponse> => api.put(routes.password, data),
    },
    admin: {
      promote: ({ id }: { id: number }): Promise<AxiosResponse> =>
        api.put(routes.promote(id)),
      demote: ({ id }: { id: number }): Promise<AxiosResponse> =>
        api.put(routes.demote(id)),
    },
  },
  types: {
    create: (data: {
      type: string;
      description: string;
      range: number;
      price: number;
      max_number: number;
      color: string;
    }): Promise<AxiosResponse> => api.post(routes.types, data),
    delete: ({ id }: { id: number }): Promise<AxiosResponse> =>
      api.delete(`${routes.types}/${id}`),
    index: ({
      page,
      limit,
    }: {
      page?: number;
      limit?: number;
    }): Promise<AxiosResponse> =>
      !page && !limit
        ? api.get(`${routes.types}`)
        : api.get(`${routes.types}?page=${page || 1}&limit=${limit || 10}`),
    show: ({ id }: { id: number }): Promise<AxiosResponse> =>
      api.get(`${routes.types}/${id}`),
    update: (data: {
      id: number;
      type?: string;
      description?: string;
      range?: number;
      price?: number;
      max_number?: number;
      color?: string;
    }): Promise<AxiosResponse> => api.put(`${routes.types}/${data.id}`, data),
  },
  bets: {
    multiCreate: (
      data: {
        numbers: number[];
        type_id: number;
      }[]
    ): Promise<AxiosResponse> => api.post(routes.multiBets, { bets: data }),
    create: (data: {
      numbers: number[];
      type_id: number;
    }): Promise<AxiosResponse> => api.post(routes.bets(data.type_id), data),
    delete: ({
      id,
      type_id,
    }: {
      id: number;
      type_id: number;
    }): Promise<AxiosResponse> => api.delete(`${routes.bets(type_id)}/${id}`),
    multiIndex: ({
      page,
      limit,
      type_ids,
    }: {
      page?: number;
      limit?: number;
      type_ids?: number[];
    }): Promise<AxiosResponse> =>
      api.get(
        `${routes.multiBets}?page=${page || 1}&limit=${limit || 10}${
          type_ids && `&type=${type_ids.join(',')}`
        }`
      ),
    index: ({
      page,
      limit,
      type_id,
    }: {
      page?: number;
      limit?: number;
      type_id: number;
    }): Promise<AxiosResponse> =>
      api.get(`${routes.bets(type_id)}?page=${page || 1}&limit=${limit || 10}`),
    show: ({
      id,
      type_id,
    }: {
      id: number;
      type_id: number;
    }): Promise<AxiosResponse> => api.get(`${routes.bets(type_id)}/${id}`),
    update: (data: {
      id: number;
      type_id: number;
      numbers: number[];
    }): Promise<AxiosResponse> =>
      api.put(`${routes.bets(data.type_id)}/${data.id}`, data),
  },
};

export default api;
