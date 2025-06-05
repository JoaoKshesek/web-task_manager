import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ** Queries - API
import { accountApi } from "./queries/accountApi";
import { authApi } from "./queries/authApi";
import { dashboardApi } from "./queries/dashboardApi";
import { taskApi } from "./queries/taskApi";

// ** Reducers - Commom
import { authSlice } from "./reducers/commom/auth";

// ** Reducers - Modules
import { taskModuleSlice } from "./reducers/modules/task-module";
import { dashboardModuleSlice } from "./reducers/modules/dashboard-module";

const reducers = combineReducers({
  [accountApi.reducerPath]: accountApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,

  [authSlice.name]: authSlice.reducer,
  [dashboardModuleSlice.name]: dashboardModuleSlice.reducer,
  [taskModuleSlice.name]: taskModuleSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: [authSlice.name],
  },
  reducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([accountApi.middleware, authApi.middleware, dashboardApi.middleware, taskApi.middleware]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
