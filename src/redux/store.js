// src/store/index.ts (example)

import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from './todoApi';


const reduxStore = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware),
});

export default reduxStore;
