import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import MathGame from './components/math_game/game';
import EatLeaves from './components/eat_leaves/game';
import DeathStar from './components/death_star/game';
import PoliteGame from './components/polite_game/game';
import WardenChess from './components/WardenChess/WardenChess';
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
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <AuthorizeRoute path='/mathgame' component={MathGame} />
          <Route path='/destroydeathstar' component={DeathStar} />
          <Route path='/eatleaves' component={EatLeaves} />
          <Route path='/politegame' component={PoliteGame} />
          <Route path='/wardenchess' component={WardenChess} />
          <AuthorizeRoute path='/fetch-data' component={FetchData} />
          <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        </Layout>
      </AppContext.Provider>
    );
  }
}
