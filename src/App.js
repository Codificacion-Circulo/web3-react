import React, { Suspense } from 'react';
import { Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import Layout from './layout/Layout'
import LoadingSpinner from './components/LoadingSpinner'
import View from './pages/View'
import Mine from './pages/Mine'
import Error from './pages/Error'
import Create from './pages/Create'
import Home from './pages/Home'
import Blog from './pages/Blog'
import MineBlog from './pages/MineBlog'



import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'


function getLibrary(provider) {
  return new Web3(provider)
}


function App() {
  return (
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
    <Layout>
    <Suspense
      fallback={
        <div className='centered'>
          <LoadingSpinner />
        </div>
      }
    >

    <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Route path='/create' exact>
            <Create />
          </Route>
          <Route path='/view' exact>
            <View />
          </Route>
          <Route path='/blog/:id' exact>
            <Blog />
          </Route>
          <Route path='/mine' exact>
            <Mine />
          </Route>
          <Route path='/mine/:id' exact>
            <MineBlog />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>

    </Suspense>
  </Layout>
  </Web3ReactProvider>
  </BrowserRouter>
  );
}

export default App;
