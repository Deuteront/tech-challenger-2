'use client';

import React from 'react';
import { Header } from '@/components/organisms/landing-page/header/header';
import { Input } from '@/components/atoms/input/input';
import { Logo } from '@/components/organisms/logo/logo';
import { Button } from '@/components/atoms/button/button';
import './style.scss';
import { UserService } from '@/service/user';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/service/interfaces';
import { saveToStorage } from '@/utils/storage';

const Login: React.FC = () => {
  const router = useRouter();

  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length > 0;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;

    setFormState((prevState) => ({
      ...prevState,
      email: emailValue,
      isEmailValid: validateEmail(emailValue),
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;

    setFormState((prevState) => ({
      ...prevState,
      password: passwordValue,
      isPasswordValid: validatePassword(passwordValue),
    }));
  };

  const sendLoginRequest = async () => {
    if (formState.isEmailValid && formState.isPasswordValid) {
      try {
        const response = await UserService.authenticateUser(
          formState.email,
          formState.password
        );
        saveToStorage('authToken', response.result.token);
        const user = jwtDecode(response.result.token) as User;
        saveToStorage('username', user.username);
        router.push('/dashboard');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao autenticar. Verifique suas credenciais.');
      }
    }
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <>
      <Header />
      <div className="login-content">
        <div className="login-body">
          <div className="login-title">
            <Logo avoidText={true} sizeIcon={{ width: 48, height: 48 }} />
            <div className="title">
              <span className="primary-text">Faça login na sua MeowConta</span>
              <span className="secondary-text">
                Insira seu e-mail para fazer o login.
              </span>
            </div>
          </div>
          <div className="login-form">
            <Input
              type="email"
              label="E-mail"
              onChange={handleEmailChange}
              value={formState.email}
            />
            <Input
              type="password"
              label="Senha"
              onChange={handlePasswordChange}
              value={formState.password}
            />
          </div>
          <div className="login-footer">
            <Button
              onClick={sendLoginRequest}
              className={['button', 'primary-button', 'next-button']}
              disabled={!formState.isEmailValid || !formState.isPasswordValid}
            >
              Entrar
            </Button>
            <div className="login-register" onClick={goToRegister}>
              Não tem uma conta? <span className="click-text">Cadastre-se</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
