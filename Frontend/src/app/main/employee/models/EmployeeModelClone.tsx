import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { BloodGroup, EmployeeModel, RelationWithEmployee, SalaryType } from '../EmployeeApi';

/**
 * The product model.
 */
const EmployeeModelClone = (data: PartialDeep<EmployeeModel>) =>
	_.defaults(data || {}, {
		id: 0,
		photoURL: '',
		employeeNumber: 0,
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		position: '',
		userId: '',
		roleId: '',
		employeeCategoryId: 0,
		employeePersonalDetailsId: 0,
		employeePersonalDetails: {
			id: 0,
			isDeleted: false,
			dateOfBirth: '',
			gender: '',
			maritalStatus: '',
			bloodGroup: '' as BloodGroup,
			relationWithEmployee: '' as RelationWithEmployee
		},
		employeeWorkInformationId: 0,
		employeeWorkInformation: {
			id: 0,
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
		employeeAddressId: 0,
		employeeAddresses: {
			id: 0,
			isDeleted: false,
			addressLine1: '',
			addressLine2: '',
			city: '',
			country: '',
			state: '',
			pinCode: ''
		},
		employeeIdentityInfoId: 0,
		employeeIdentityInfos: {
			id: 0,
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
		employeeEducationDetailIds: 0,
		employeeEducationDetail: [{ type: '', university: '', year: '', grade: '' }]
	});

export default EmployeeModelClone;
