import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/slice';
import ui from './ui/slice';

const store = configureStore({
  reducer: {
    auth,
    ui,
  },
});

export default store;
