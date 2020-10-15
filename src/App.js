import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';
import Listings from './containers/Listings';
import ListingDetail from './containers/ListingDetail';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Layout from './hocs/Layout'; //Se incrusta dentro de layour navbar y con switch se cambia las rutas
import NotFound from './components/NotFound';
import './sass/main.scss';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout> 
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/listings" component={Listings} />
            <Route exact path="/listings/:id" component={ListingDetail} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route component={NotFound} />

          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
