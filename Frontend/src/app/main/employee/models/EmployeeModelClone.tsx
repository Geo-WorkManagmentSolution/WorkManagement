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
		employeeCategoryId:null,
		roleId: '',
		employeePersonalDetails: {
			isDeleted: false,
			dateOfBirth: '',
			gender: '',
			maritalStatus: '',
			bloodGroup: null as BloodGroup,
			relationWithEmployee: null as RelationWithEmployee
		},
		employeeWorkInformation: {
			isDeleted: false,
			designation: '',
			salaryType: null as SalaryType,
			hireDate: null,
			salary: null,
			site: '',
			bond: null,
			previousDateOfJoiningInGDR: null,
			previousDateOfLeavingInGDR: null,
			grpHead: ''
		},
		employeeAddresses: {
			isDeleted: false,
			userAddress: {
				addressLine1: '',
				addressLine2: '',
				city: '',
				state: '',
				country: '',
				pincode: null,
			  },
			  mailingAddress: {
				addressLine1: '',
				addressLine2: '',
				city: '',
				state: '',
				country: '',
				pincode: null,
			  },
			  useUserAddressForMailing: false,		
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
		employeeEducationDetail: [{ type: '', university: '', passingYear: '', grade: '' }],
		employeeRelationshipDetails: [{ relationshipType: '', name: '', email: '', phoneNumber: ''}]
	});

export default EmployeeModelClone;
