'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/atoms/input/input';
import { Logo } from '@/components/organisms/logo/logo';
import { Button } from '@/components/atoms/button/button';
import { UserService } from '@/service/user';
import { Header } from '@/components/organisms/home/header/header';

const Register: React.FC = () => {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isEmailValid: false,
    isPasswordValid: false,
    isConfirmPasswordValid: false,
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length > 0;
  const validateConfirmPassword = (confirmPassword: string) =>
    confirmPassword === formState.password;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const NameValue = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      name: NameValue,
    }));
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      email: emailValue,
      isEmailValid: validateEmail(emailValue),
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPasswordValue = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      confirmPassword: confirmPasswordValue,
      isConfirmPasswordValid: validateConfirmPassword(confirmPasswordValue),
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

  const sendRegisterRequest = async () => {
    if (
      formState.isEmailValid &&
      formState.isPasswordValid &&
      formState.isConfirmPasswordValid
    ) {
      try {
        const response = await UserService.createUser(
          formState.name,
          formState.email,
          formState.password
        );
        console.log('Cadastro realizado com sucesso:', response);
        router.push('/login');
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    }
  };

  const router = useRouter();
  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <Header />
      <div className="register-content">
        <div className="register-body">
          <div className="register-title">
            <Logo avoidText={true} sizeIcon={{ width: 48, height: 48 }} />
            <div className="title">
              <span className="primary-text">Cadastre-se na MeowCash!</span>
              <span className="secondary-text">
                Faça seu cadastro e controle suas finanças
                <br /> com mais facilidade.
              </span>
            </div>
          </div>
          <div className="register-form">
            <Input
              type="text"
              label="Nome Completo"
              onChange={handleNameChange}
              value={formState.name}
            />
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
            <Input
              type="password"
              label="Confirmar Senha"
              onChange={handleConfirmPasswordChange}
              value={formState.confirmPassword}
            />
          </div>
          <div className="register-footer">
            <Button
              onClick={sendRegisterRequest}
              className={['button', 'primary-button', 'next-button']}
              disabled={
                !formState.isEmailValid ||
                !formState.isPasswordValid ||
                !formState.isConfirmPasswordValid
              }
            >
              Começar agora
            </Button>
            <span className="term-of-use">
              Ao criar uma conta, você concorda com nossos <br />
              <span className="click-text">Termos de Serviço</span> e reconhece
              o recebimento de <br /> nossa{' '}
              <span className="click-text">Política de Privacidade.</span>
            </span>
          </div>
          <Button onClick={goToLogin} className={['back-button']}>
            <span className="register-login">
              Já tem uma conta? <span className="click-text">Entrar</span>
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
