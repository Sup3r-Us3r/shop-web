import {useState, useContext} from 'react';
import {
  AiOutlineLoading3Quarters as LoadingIcon,
  AiOutlineCamera as CameraIcon,
} from 'react-icons/ai';

import AuthContext from '../../contexts/auth';

import {toastSuccess, toastError} from '../../config/toast';

import shopImg from '../../assets/images/shop.svg';

import {Wrapper} from './styles';

const Auth = () => {
  const {signIn, signUp} = useContext(AuthContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [photo, setPhoto] = useState<File>({} as File);
  const [photoPreview, setPhotoPreview] = useState<string>('https://picsum.photos/seed/image001/500/500');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [changeFormType, setChangeFormType] = useState<string>('login');

  function handleChangeFormType() {
    setChangeFormType(
      (prevState) => prevState === 'login' ? 'register' : 'login'
    );
  }

  function handleProcessImage(event: React.ChangeEvent<HTMLInputElement>) {
    const currentFileListPhoto = event.target.files;

    if (currentFileListPhoto) {
      const currentPhoto = Array.from(currentFileListPhoto)[0];
      setPhoto(currentPhoto);

      const objectUrl = URL.createObjectURL(currentPhoto);
      setPhotoPreview(objectUrl);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();

      setSubmitting(true);

      if (changeFormType === 'login') {
        const response = await signIn({
          email,
          password,
        });

        if (!response) {
          setSubmitting(false);
          return false;
        }
      }

      if (changeFormType === 'register') {
        const response = await signUp({
          name,
          email,
          password,
          photo,
        });

        if (!response) {
          setSubmitting(false);
          return false;
        }

        setChangeFormType('login');

        toastSuccess('Usuário criado com sucesso!');
      }
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);

      setSubmitting(false);
    }
  }

  return (
    <Wrapper>
      <section />

      <section>
        <form onSubmit={handleSubmit}>
          {
            changeFormType === 'login' ? (
              <img src={shopImg} alt="Shop" />
            ) : (
              <div>
                <img src={photoPreview} alt="Profile" />
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  onChange={handleProcessImage}
                />
                <label htmlFor="image">
                  <CameraIcon color="#39D183" size={20} />
                </label>
              </div>
            )
          }

          {changeFormType === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          )}
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button
            type="submit"
            disabled={submitting}
            className={submitting ? 'submitting' : ''}
          >
            {!submitting ? 'Confirmar' : (
              <LoadingIcon color="#FFF" size={20} />
            )}
          </button>

          <button type="button" onClick={handleChangeFormType}>
            {changeFormType === 'login'
              ? 'Não possuo uma conta'
              : 'Já possuo uma conta'
          }</button>
        </form>
      </section>
    </Wrapper>
  );
}

export default Auth;
