import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
    activeSidebar: boolean;
}

const initialState: SidebarState = {
    activeSidebar: false,
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.activeSidebar = !state.activeSidebar;
        },
    },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
