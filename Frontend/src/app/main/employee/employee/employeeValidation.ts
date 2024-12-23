import * as yup from 'yup';

export const employeeSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string().required('Middle Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  alternateEmail: yup.string().email('Invalid email address').nullable(),
  phoneNumber: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
  alternateNumber: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
  employeeCategoryId: yup.number().required('Category is required'),
  roleId: yup.string().required('Employee role is required'),
  
  employeePersonalDetails: yup.object({
    gender: yup.string().required('Gender is required'),
    dateOfBirth: yup.date()
      .max(new Date(), 'Birth date cannot be in the future')
      .nullable()
      .test('is-adult', 'You must be at least 16 years old', (value) => {
        if (!value) return true;
        const today = new Date();
        const minAge = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
        return value <= minAge;
      }),
    maritalStatus: yup.string().nullable(),
    bloodGroup: yup.string().nullable(),
  }),

  employeeWorkInformation: yup.object({
    salaryType: yup.string().required('Salary Type is required'),
    salary: yup.number()
      .required('Salary is required')
      .typeError('Salary must be a number')
      .positive('Salary must be greater than zero'),
    hireDate: yup.date().required('Hire Date is required'),
    siteId: yup.number().nullable(),
    designation: yup.string().nullable(),
    useDefaultLeaves: yup.boolean(),
  }),

  employeeEducationDetail: yup.array().of(
    yup.object({
      type: yup.string().nullable(),
      university: yup.string().nullable(),
      passingYear: yup.string().nullable(),
      grade: yup.string().nullable(),
    })
  ).nullable(),

  employeeRelationshipDetails: yup.array().of(
    yup.object({
      relationshipType: yup.string().nullable(),
      name: yup.string().nullable(),
      email: yup.string().email('Invalid email').nullable(),
      phoneNumber: yup.string().nullable(),
    })
  ).nullable(),

  employeeAddresses: yup.object({
    useUserAddressForMailing: yup.boolean(),
    userAddress: yup.object({
      addressLine1: yup.string().nullable(),
      addressLine2: yup.string().nullable(),
      city: yup.string().nullable(),
      state: yup.string().nullable(),
      country: yup.string().nullable(),
      pincode: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
    }),
    mailingAddress: yup.object({
      addressLine1: yup.string().nullable(),
      addressLine2: yup.string().nullable(),
      city: yup.string().nullable(),
      state: yup.string().nullable(),
      country: yup.string().nullable(),
      pincode: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
    }),
  }),
});

export type EmployeeFormData = yup.InferType<typeof employeeSchema>;

