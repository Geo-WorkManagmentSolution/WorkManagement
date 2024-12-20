/**
 * The authRoles object defines the authorization roles for the Fuse application.
 */
const authRoles = {
	/**
	 * The admin role grants access to users with the 'admin' role.
	 */
	admin: ['admin','HR Admin'],

	HRAdmin : ['HR Admin'], 

	/**
	 * The staff role grants access to users with the 'admin' or 'staff' role.
	 */
	Manager: ['admin', 'Manager','HR Admin'],

	/**
	 * The user role grants access to users with the 'admin', 'staff', or 'user' role.
	 */
	Employee: ['admin', 'Employee','Manager','HR Admin'],

	/**
	 * The onlyGuest role grants access to unauthenticated users.
	 */
	onlyGuest: []
};

export default authRoles;

