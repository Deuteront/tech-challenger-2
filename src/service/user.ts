import {
  AccountResponse,
  AuthResponse,
  authUser,
  Filter,
  User,
} from '@/service/interfaces';
import { service } from '@/service/facade';

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

const getAccount = async (
  token: string,
  filter?: Filter
): Promise<AccountResponse> => {
  return service.get<AccountResponse, Filter>('/account', token, filter);
};

export const UserService = {
  createUser,
  authenticateUser,
  getAccount,
};
