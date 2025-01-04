import { useContext } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useDispatch } from 'react-redux';
import useJwtAuth from './services/jwt/useJwtAuth';
import { AuthContext, AuthContextType } from './AuthenticationProvider';
import useFirebaseAuth from './services/firebase/useFirebaseAuth';
import { User } from './user';
import { setUserPermissions } from './user/store/userSlice';

interface AuthProvider {
	signOut: () => void;
	updateUser: (user: User) => void;
	updateUserPermissions: (permissions: any[]) => void;
}

type AuthProviders = {
	[key: string]: AuthProvider;
};

function useAuth(): AuthContextType & { signOut: () => void; updateUserPermissions: (permissions: any[]) => void } {
	const context = useContext(AuthContext);
	const { signOut: amplifySignOut } = useAuthenticator();
	const { signOut: jwtSignOut, updateUser: jwtUpdateUser } = useJwtAuth();
	const { signOut: firebaseSignOut, updateUser: firebaseUpdateUser } = useFirebaseAuth();
	const dispatch = useDispatch();

	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}

	const authProviders: AuthProviders = {
		amplify: {
			signOut: amplifySignOut,
			updateUser: () => {},
			updateUserPermissions: () => {}
		},
		jwt: {
			signOut: jwtSignOut,
			updateUser: jwtUpdateUser,
			updateUserPermissions: (permissions) => dispatch(setUserPermissions(permissions))
		},
		firebase: {
			signOut: firebaseSignOut,
			updateUser: firebaseUpdateUser,
			updateUserPermissions: (permissions) => dispatch(setUserPermissions(permissions))
		}
	};

	const signOut = () => {
		const authProvider = context.getAuthProvider();
		authProviders[authProvider]?.signOut();
	};

	const updateUser = (user: User) => {
		const authProvider = context.getAuthProvider();
		authProviders[authProvider]?.updateUser(user);
	};

	return {
		...context,
		signOut,
		updateUser,
		updateUserPermissions: (permissions: any[]) => {
			const authProvider = context.getAuthProvider();
			authProviders[authProvider]?.updateUserPermissions(permissions);
		}
	};
}

export default useAuth;
