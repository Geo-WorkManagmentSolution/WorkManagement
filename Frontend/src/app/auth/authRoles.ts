/**
 * The authRoles object defines the authorization roles for the Fuse application.
 */
const authRoles = {
	/**
	 * The admin role grants access to users with the 'admin' role.
	 */
	admin: ['admin'],

	/**
	 * The staff role grants access to users with the 'admin' or 'staff' role.
	 */
	Manager: ['admin', 'Manager'],

	/**
	 * The user role grants access to users with the 'admin', 'staff', or 'user' role.
	 */
	Employee: ['admin', 'Employee','Manager'],

	/**
	 * The onlyGuest role grants access to unauthenticated users.
	 */
	onlyGuest: []
};

export default authRoles;

