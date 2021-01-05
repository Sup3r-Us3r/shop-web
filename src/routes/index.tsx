import {useContext} from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

import AuthContext from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const {signed, loading} = useContext(AuthContext);

  if (loading) {
    TopBarProgress.config({
      barColors: {
        '0': '#39D183',
        '1': '#40e791',
      },
    });

    return <TopBarProgress />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
