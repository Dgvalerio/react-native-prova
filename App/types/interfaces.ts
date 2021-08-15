export interface IBackType {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface IType {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface IBackUser {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  reset_password_token: string;
  reset_password_token_date: string;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IAuthStore {
  signed: boolean;
  user: IUser | null;
}

export interface IUIStore {
  loading: boolean;
}

export interface IBet {
  id: string;
  numbers: number[];
  date: string;
  type: string;
  price: number;
}

export interface IBetWithType {
  id: string;
  numbers: number[];
  created_at?: Date | string;
  updated_at?: Date | string;
  type: IType;
}
