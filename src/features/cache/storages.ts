import usersStorage from '@/features/users/storage';

import { AbstractStorage } from './types';

const storages: Array<AbstractStorage<any>> = [usersStorage];

export default storages;
