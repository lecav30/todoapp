import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '@feature/sidebar/sidebarSlice';
import dataReducer from '@feature/data/dataSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        data: dataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
