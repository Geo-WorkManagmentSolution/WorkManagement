import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { BloodGroup, EmployeeModel, RelationWithEmployee, SalaryType } from '../EmployeeApi';

/**
 * The product model.
 */
const EmployeeModelClone = (data: PartialDeep<EmployeeModel>) =>
	_.defaults(data || {}, {
		photoURL: '',
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		roleId: '',
		employeePersonalDetails: {
			isDeleted: false,
			dateOfBirth: '',
			gender: '',
			maritalStatus: '',
			bloodGroup: '' as BloodGroup,
			relationWithEmployee: '' as RelationWithEmployee
		},
		employeeWorkInformation: {
			isDeleted: false,
			designation: '',
			salaryType: '' as SalaryType,
			hireDate: '',
			salary: 0,
			site: '',
			bond: 0,
			previousDateOfJoiningInGDR: '',
			previousDateOfLeavingInGDR: '',
			grpHead: ''
		},
		employeeAddresses: {
			isDeleted: false,
			addressLine1: '',
			addressLine2: '',
			city: '',
			country: '',
			state: '',
			pinCode: ''
		},
		employeeIdentityInfos: {
			isDeleted: false,
			uid: '',
			bankAccountNumber: '',
			bankName: '',
			branch: '',
			ifsc: '',
			accountHolderName: '',
			pan: '',
			providentFundNumber: '',
			employeeStateInsuranceNumber: '',
			biometricCode: ''
		},
		employeeEducationDetail: [{ type: '', university: '', passingYear: '', grade: '' }]
	});

export default EmployeeModelClone;
