import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { User } from 'src/app/auth/user';

function UserModel(data: PartialDeep<User>): User {
  data = data || {};

  return _.defaults(data, {
    uid: '',
    role: null, // guest
    data: {
      displayName: 'Guest User',
      photoURL: '',
      email: '',
      shortcuts: [],
      settings: {},
      permissionsName: [] // Add this line

    },
  });
}

export default UserModel;

