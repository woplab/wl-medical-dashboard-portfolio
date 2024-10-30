// store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';

const store = configureStore({
    reducer: rootReducer,
    // Optionally configure middleware, enhancers, etc.
});

export default store;
