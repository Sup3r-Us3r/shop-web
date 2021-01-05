import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Auth from '../pages/Auth';

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Auth} />
        <Route path="/register" component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default AuthRoutes;
