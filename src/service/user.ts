import {
  AccountResponse,
  AuthResponse,
  authUser,
  User,
} from '@/service/interfaces';
import { service } from '@/service/facade';
import { getFromStorage } from '@/utils/storage';

const token = getFromStorage('authToken') as string;

const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<{
  message: string;
  result: User;
}> => {
  return service.post<{ message: string; result: User }, User>('/user', {
    username,
    email,
    password,
  });
};

const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return service.post<AuthResponse, authUser>('/user/auth', {
    email,
    password,
  });
};

const getAccount = async (): Promise<AccountResponse> => {
  return service.get<AccountResponse, null>('/account', token);
};

export const UserService = {
  createUser,
  authenticateUser,
  getAccount,
};
