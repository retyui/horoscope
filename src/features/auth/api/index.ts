import { storeTokens } from '../tokensStorage';
import AuthResource from './AuthResource';

const authApi = new AuthResource({
  onTokensUpdate: storeTokens,
});

export default authApi;
