import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Category from '../pages/Category';
import Categories from '../pages/Categories';
import ListListingAdmin from '../pages/ListListingAdmin';
import AddListing from '../pages/AddListing';
import Item from '../pages/Item';
import EditListing from '../pages/EditListing';
import EditProfile from '../pages/EditProfile';
import UserProfile from '../pages/UserProfile';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Report from '../pages/AddReport';
import Signout from '../pages/Signout';
import ListReports from '../pages/ListReports';
import CreateProfile from '../pages/CreateProfile';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/list" component={Categories}/>
              <ProtectedRoute path="/add" component={AddListing}/>
              <ProtectedRoute path="/user/:email" component={UserProfile}/>
              <ProtectedRoute path="/category/:category" component={Category}/>
              <AdminProtectedRoute path="/admin" component={ListListingAdmin}/>
              <ProtectedRoute path="/edit/:_id" component={EditListing}/>
              <ProtectedRoute path="/editprofile/:email" component={EditProfile}/>
              <ProtectedRoute path="/createprofile/_id" component={CreateProfile}/>
              <ProtectedRoute path="/view/:_id" component={Item}/>
              <AdminProtectedRoute path="/adminreports" component={ListReports}/>
              <ProtectedRoute path="/report/:_id" component={Report}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          return isLogged ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
