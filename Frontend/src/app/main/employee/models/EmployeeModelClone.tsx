import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { EmployeeModel } from '../EmployeeApi';

/**
 * The product model.
 */
const EmployeeModelClone = (data: PartialDeep<EmployeeModel>) =>
	_.defaults(data || {}, {
		id: 0,
		photoURL: '',
		employeeNumber: 0,
		isActive: false,
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: 0,
		position: '',
		role: '',
		employeePersonalDetails: {
			dateOfBirth: null,
			gender: '',
			maritalStatus: ''
		}
	});

export default EmployeeModelClone;
