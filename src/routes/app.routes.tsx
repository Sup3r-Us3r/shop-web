import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact  component={Home} />
        <Route path="/products" component={Products} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
