import {
  AccountResponse,
  AuthResponse,
  authUser,
  User,
} from '@/service/interfaces';
import { service } from '@/service/facade';

class Service {
  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<{
    message: string;
    result: User;
  }> {
    return service.post<{ message: string; result: User }, User>('/user', {
      username,
      email,
      password,
    });
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    return service.post<AuthResponse, authUser>('/user/auth', {
      email,
      password,
    });
  }

  async getAccount(token: string): Promise<AccountResponse> {
    return service.get<AccountResponse>('/account', token);
  }
}

export const UserService = new Service();
