import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu style={menuStyle} attached="top" color='green' borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>UHManoasList</Header>
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>Categories</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Sell an item</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                [<Menu.Item key='user'>
                  <Link to={`/user/${this.props.currentUser}`}>{this.props.currentUser}</Link>
                </Menu.Item>,
                  <Dropdown pointing="top right" icon={'user'} key='signout'>
                    <Dropdown.Menu>
                      <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                    </Dropdown.Menu>
                  </Dropdown>]
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
