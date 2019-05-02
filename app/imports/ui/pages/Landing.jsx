import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='uhmanoaslist-landing-page'>
          <Grid container stackable centered columns={1}>

            <Grid.Column textAlign='center'>
              <h1 className='header' inverted>Welcome to UHManoasList</h1>
              <h3 className='header2' inverted>Log in to sell and buy items!</h3>
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
