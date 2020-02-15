import rootReducer from '@/redux/rootReducer';

export type RootState = Readonly<ReturnType<typeof rootReducer>>;
