import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Column width={8}>
            <h1>Welcome to this template</h1>
            <Menu style={menuStyle} attached="top" borderless>

            {this.props.currentUser ? (
                [<Menu.Item as={NavLink} activeClassName="active" exact to="/text" key='text'>Textbooks</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>]
            ) : ''}
            </Menu>
          </Grid.Column>
        </Grid>
    );
  }
}


Landing.propTypes = {
  currentUser: PropTypes.string,
};

const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

export default withRouter(LandingContainer);


