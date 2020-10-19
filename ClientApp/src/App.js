import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import MathGame from './components/math_game/mathgame';
import EatLeaves from './components/eat_leaves/game';
import DeathStar from './components/death_star/game';
import PoliteGame from './components/polite_game/game';
import WardenChess from './components/WardenChess/WardenChess';
import Zogo from './components/zogo/zogo';
import AppContext from './components/AppContext';
import { SignalRHub } from './components/SignalRHub';

import './custom.css'
const signalRHub = new SignalRHub();
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <AppContext.Provider value={{signalRHub}}>
        <Layout>
          <AuthorizeRoute exact path='/' component={Home} />
          <AuthorizeRoute path='/mathgame/:hubGroupId' component={MathGame} />
          <Route path='/destroydeathstar' component={DeathStar} />
          <Route path='/eatleaves' component={EatLeaves} />
          <Route path='/politegame' component={PoliteGame} />
          <Route path='/wardenchess' component={WardenChess} />
          <Route path='/zogo' component={Zogo} />
          <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        </Layout>
      </AppContext.Provider>
    );
  }
}
