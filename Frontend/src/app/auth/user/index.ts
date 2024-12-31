import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';

export type User = {
  uid: string;
  role: string[] | string | null;
  data: {
    displayName: string;
    photoURL?: string;
    email?: string;
    shortcuts?: string[];
    settings?: Partial<FuseSettingsConfigType>;
    loginRedirectUrl?: string;

  };
  permissions?: {
	permissionCategoryName: string;
	permissionCategoryId: string;
	actions: {
	  name: string;
	  id: string;
	}[];
  }[];
};

