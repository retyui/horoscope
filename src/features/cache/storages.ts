import companiesStorage from '@/features/companies/storage';
import companiesThemesStorage from '@/features/companiesThemes/storage';
import contentBlocksStorage from '@/features/contentBlocks/storage';
import contentPagesStorage from '@/features/contentPages/storage';
import usersStorage from '@/features/users/storage';

import { AbstractStorage } from './types';

const storages: Array<AbstractStorage<any>> = [
  companiesStorage,
  companiesThemesStorage,
  contentBlocksStorage,
  contentPagesStorage,
  usersStorage,
];

export default storages;
