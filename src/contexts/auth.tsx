import {useState, useEffect, createContext} from 'react';

import {IUserData} from '../services/auth';

import * as auth from '../services/auth';

type WithChildren<T = {}> =
  T & {children: React.ReactNode};

interface IAuthContextData {
  signed: boolean;
  loading: boolean;
  userData: IUserData;
  signIn: (userSentData: object) => Promise<false | IUserData>;
  signUp: (userSentData: object) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({children}: WithChildren) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [signed, setSigned] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({} as IUserData);

  async function signIn(userSentData: object) {
    const response = await auth.handleSignIn(userSentData) as IUserData;

    if (!response) {
      return false;
    }

    localStorage.setItem('@shop/userData', JSON.stringify(response));

    setUserData(response);
    setSigned(true);

    return response;
  }

  async function signUp(userSentData: object) {
    const response = await auth.handleSignUp(userSentData);

    if (!response) {
      return false;
    }

    return true;
  }

  function signOut() {
    localStorage.clear();
    setSigned(false);
    window.location.reload();
  }

  useEffect(() => {
    const userDataStorage = localStorage.getItem('@shop/userData');

    if (userDataStorage) {
      const userDataParse = JSON.parse(userDataStorage);

      setLoading(false);
      setUserData(userDataParse);
      setSigned(true);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={
      {signed, loading, userData, signIn, signUp, signOut}
    }>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
