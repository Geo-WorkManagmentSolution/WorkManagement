import { JwtAuthConfig } from './JwtAuthProvider';

const jwtAuthConfig: JwtAuthConfig = {
	tokenStorageKey: 'jwt_access_token',
	signInUrl: 'api/auth/signin',
	signUpUrl: 'api/auth/register',
	tokenRefreshUrl: 'api/auth/refresh',
	getUserUrl: 'api/auth/user',
	updateUserUrl: 'api/auth/user',
	updateTokenFromHeader: true
};

export default jwtAuthConfig;
