import * as Yup from 'yup';

import api from './api';

import {toastWarn, toastError} from '../config/toast';

export interface IUserData {
  id: number;
  name: string;
  email: string;
  password: string;
  photo: {
    public_id: string;
    url: string;
  };
  created_at: Date;
}

function handleFieldsValidation(fields: object) {
  const validation = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    photo: Yup.mixed(),
  });

  return validation.isValid(fields);
}

export async function handleSignIn(userData: object) {
  try {
    const validation = await handleFieldsValidation(userData);

    if (!validation) {
      toastWarn('Erro ao validar campos');
      return false;
    }

    const response = await api.post('user/login', userData);

    if (response) {
      return response.data;
    }
  } catch (err) {
    const {error} = err.response.data;

    toastError(error);
  }
}

export async function handleSignUp(userData: object) {
  try {
    const validation = await handleFieldsValidation(userData);

    if (!validation) {
      toastWarn('Erro ao validar campos');
      return false;
    }

    const user = userData as {
      name: string;
      email: string;
      password: string;
      photo: File;
    };

    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('photo', user.photo);

    const response = await api.post('user/create', formData);

    if (response) {
      return true;
    }
  } catch (err) {
    const {error} = err.response.data;

    toastError(error);
  }
}
