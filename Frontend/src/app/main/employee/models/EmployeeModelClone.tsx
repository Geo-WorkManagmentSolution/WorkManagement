import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { BloodGroup, EmployeeModel, MaritalStatus, RelationWithEmployee, SalaryType } from '../EmployeeApi';

/**
 * The product model.
 */
const EmployeeModelClone = (data: PartialDeep<EmployeeModel>) =>	
	_.defaults(data || {}, {
		photoURL: '',
		firstName: '',
		lastName: '',
		email: null,
		phoneNumber: undefined,
		employeeCategoryId:null,
		roleId: '',
		jobLevelLeaveType: null,
		employeePersonalDetails: {
			isDeleted: false,
			dateOfBirth: '',
			gender: '',
			maritalStatus: null as MaritalStatus,
			bloodGroup: null as BloodGroup,
			relationWithEmployee: undefined as RelationWithEmployee
		},
		employeeWorkInformation: {
			isDeleted: false,
			siteId:null,
			designation: '',
			// salaryType: null as SalaryType,
			hireDate: null,
			// salary: null,
			site: '',
			bond: null,
			previousDateOfJoiningInGDR: null,
			previousDateOfLeavingInGDR: null,
			grpHead: '',
			useDefaultLeaves:true
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
		employeeRelationshipDetails: [{ relationshipType: undefined, name: "", email: "", phoneNumber: ""}],
		employeeInsuranceDetails: {serialNumber:''}
	});

export default EmployeeModelClone;
