import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {

    if (this.props.currentUser) {
      return (

          <div className='uhmanoaslist-landing-page'>
            <Grid container stackable centered columns={1}>

              <Grid.Column textAlign='center'>
                <h1 className='header' inverted>Welcome to UHManoasList</h1>
                <div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
      );
    }
    return (

        <div className='uhmanoaslist-landing-page'>
          <Grid container stackable centered columns={1}>

            <Grid.Column textAlign='center'>
              <h1 className='header' inverted>Welcome to UHManoasList</h1>
              <h3 className='header2' inverted>Sign up or Log in to buy and sell items!</h3>
              <div>
                <Button.Group>
                  <Button as={NavLink} exact to="/signup" positive>Sign Up</Button>
                  <Button.Or />
                  <Button as={NavLink} exact to="/signin" positive>Log In</Button>
                </Button.Group>
              </div>
            </Grid.Column>
          </Grid>
        </div>
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
