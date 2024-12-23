/**
 * The authRoles object defines the authorization roles for the Fuse application.
 */
const authRoles = {
	/**
	 * The admin role grants access to users with the 'admin' role.
	 */

	SuperUser: ['SuperUser'],

	HRAdmin: ['HR Admin', 'SuperUser'],

	admin: ['admin', 'HR Admin','SuperUser'],

	/**
	 * The staff role grants access to users with the 'admin' or 'staff' role.
	 */
	Manager: ['admin', 'Manager', 'HR Admin','SuperUser'],

	/**
	 * The user role grants access to users with the 'admin', 'staff', or 'user' role.
	 */
	Employee: ['admin', 'Employee', 'Manager', 'HR Admin','SuperUser'],

	/**
	 * The onlyGuest role grants access to unauthenticated users.
	 */
	onlyGuest: []
};

export default authRoles;
