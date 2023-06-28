
export type ENUM_STATUS = 'PENDING' | 'ACTIVE';
export type ENUM_ROLE = 'ADMIN' | 'DEV' | 'ASSISTANT';

export type T_APPS_COUNT = { active: number, pending: number };

export type T_AUTH_FORM = {
  email: string;
  password: string;
};

export type T_AUTH = {
  email: string | null;
  role: ENUM_ROLE | null;
};

export type T_AUTH_STORE = {
  updateValues: (state: T_AUTH) => void;
  resetValues: () => void;
};

export type T_SESSION = {
  role: ENUM_ROLE | null;
  email: string;
  id: number;
};

export type T_USER = {
  id?: number,
  email: string;
  password: string;
  createdAt?: string;
  deletedAt?: string;
  updatedAt?: string;
  role?: ENUM_ROLE;
}

export type T_APP = {
  id?: number,
  creatorId: number, 
  name: string;
  redirectLink: string;
  enabled?: boolean;
  playStoreUrl: string;
  createdAt?: string;
  deletedAt?: string;
  updatedAt?: string;
  status?: ENUM_STATUS;
  creator?: T_USER;
};

export type T_APP_UPDATE = {
  id: number,
  name: string;
  redirectLink: string;
  enabled: boolean;
  playStoreUrl: string;
  status: ENUM_STATUS;
};