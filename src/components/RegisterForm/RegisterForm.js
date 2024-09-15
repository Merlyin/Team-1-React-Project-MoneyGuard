import { useDispatch } from 'react-redux';
import { register } from 'redux/authReducer/operations';
import { CustomButton } from 'components/CustomElements/CustomButton';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import Logotip from '../../images/logo.svg';
import {
  EmailIcon,
  UserIcon,
  ErrorContainer,
  ErrorMessageStyled,
  FormStyled,
  IconContainer,
  InputStyled,
  LabelStyled,
  PasswordIcon,
} from 'components/LoginForm/LoginForm.styled';
import { LogotipStyled } from './RegisterForm.styled';
import { ProgressBar } from './ProgressBar';
import { useState } from 'react';

const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .max(12, 'Must be 12 characters or less')
    .required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password mismatch')
    .required('Required'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

  const handleSubmit = (values, { resetForm }) => {
    const credentials = {
      name: values.username.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };

    dispatch(register(credentials))
      .then(() => {
        resetForm();
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {({ values, handleChange }) => (
        <FormStyled>
          <LogotipStyled>
            <img
              src={Logotip}
              alt="Logo MoneyGuard"
              width="36px"
              height="36px"
              draggable="false"
            />
            <h3>MoneyGuard</h3>
          </LogotipStyled>
          <LabelStyled>
            <ErrorContainer>
              <IconContainer>
                <UserIcon />
              </IconContainer>
              <InputStyled
                name="username"
                type="text"
                placeholder="Username"
                autoComplete="off"
              />
              <ErrorMessageStyled>
                <ErrorMessage component="span" name="username" />
              </ErrorMessageStyled>
            </ErrorContainer>
          </LabelStyled>

          <LabelStyled>
            <ErrorContainer>
              <IconContainer>
                <EmailIcon />
              </IconContainer>
              <InputStyled
                name="email"
                type="email"
                placeholder="E-mail"
                autoComplete="off"
              />
              <ErrorMessageStyled>
                <ErrorMessage component="span" name="email" />
              </ErrorMessageStyled>
            </ErrorContainer>
          </LabelStyled>

          <LabelStyled>
            <ErrorContainer>
              <IconContainer>
                <PasswordIcon />
              </IconContainer>
              <InputStyled
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
                value={values.password}
                onChange={e => {
                  handleChange(e);
                  setPassword(e.target.value);
                }}
              />
              <ErrorMessageStyled>
                <ErrorMessage component="span" name="password" />
              </ErrorMessageStyled>
            </ErrorContainer>
          </LabelStyled>

          <LabelStyled>
            <ErrorContainer>
              <IconContainer>
                <PasswordIcon />
              </IconContainer>
              <div>
                <InputStyled
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="off"
                />
                <ProgressBar password={password} />
              </div>
              <ErrorMessageStyled>
                <ErrorMessage component="span" name="passwordConfirm" />
              </ErrorMessageStyled>
            </ErrorContainer>
          </LabelStyled>

          <CustomButton type="submit">Register</CustomButton>
          <CustomButton isNavLink to="/login">
            Log In
          </CustomButton>
        </FormStyled>
      )}
    </Formik>
  );
};

export default RegisterForm;
