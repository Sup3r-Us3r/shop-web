import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react';
import {
  AiOutlineCloseCircle as CloseIcon,
  AiOutlineLoading3Quarters as LoadingIcon,
  AiOutlineCamera as CameraIcon,
} from 'react-icons/ai';
import * as Yup from 'yup';

import AuthContext from '../../contexts/auth';

import {IUserData} from '../../services/auth';
import api from '../../services/api';

import {toastSuccess, toastWarn, toastError} from '../../config/toast';

import {Wrapper} from './styles';

export interface IModalUserSettingsHandles {
  openModal: () => void;
}

const ModalUserSettings: React.ForwardRefRenderFunction<
  IModalUserSettingsHandles
> = (_, ref) => {
  const {userData} = useContext(AuthContext);

  const [visible, setVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const [photo, setPhoto] = useState<File>({} as File);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  function handleProcessImage(event: React.ChangeEvent<HTMLInputElement>) {
    const currentFileListPhoto = event.target.files;

    if (currentFileListPhoto) {
      const currentPhoto = Array.from(currentFileListPhoto)[0];
      setPhoto(currentPhoto);

      const objectUrl = URL.createObjectURL(currentPhoto);
      setPhotoPreview(objectUrl);
    }
  }

  function handleFieldsValidation(fields: object) {
    const validation = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      // password: Yup.string().required(),
      photo: Yup.mixed().required(),
    });

    return validation.isValid(fields);
  }

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();

      setSubmitting(true);

      const userSentData = {
        name,
        email,
        photo,
      };

      console.log(userSentData);

      const validation = await handleFieldsValidation(userSentData);

      if (!validation) {
        toastWarn('Todos os campos são obrigatórios!');
        setSubmitting(false);
        return false;
      }

      const formData = new FormData();

      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', photo);

      const response = await api.put(`user/update/${userData.id}`, formData);

      console.log(response);

      if (response) {
        handleUpdateUserDataOnLocalStorage(response.data);
      }

      setSubmitting(false);

      toastSuccess('Perfil atualizado com sucesso!');
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);

      setSubmitting(false);
    }
  }

  function handleUpdateUserDataOnLocalStorage(newData: IUserData) {
    localStorage.setItem('@shop/userData', JSON.stringify(newData));
  }

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPhotoPreview(userData.photo.url);
    }
  }, [userData]);

  return visible ? (
    <Wrapper>
      <div>
        <h1>Editar informações</h1>
        <CloseIcon color="#39D183" size={25} onClick={closeModal} />
        <form onSubmit={handleSubmit}>
          <img src={photoPreview} alt="Profile" />

          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={(e) => handleProcessImage(e)}
          />
          <label htmlFor="image">
            <CameraIcon color="#39D183" size={20} />
          </label>

          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* <input
            type="text"
            name="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          /> */}

          <button
            type="submit"
            disabled={submitting}
            className={submitting ? 'submitting' : ''}
          >
            {!submitting ? 'Confirmar' : (
              <LoadingIcon color="#FFF" size={20} />
            )}
          </button>
        </form>
      </div>
    </Wrapper>
  ) : null;
}

export default forwardRef(ModalUserSettings);
