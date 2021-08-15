import 'react-redux';
import { IAuthStore, IUIStore } from './interfaces';

declare module 'react-redux' {
  export interface DefaultRootState {
    auth: IAuthStore;
    ui: IUIStore;
  }
}
