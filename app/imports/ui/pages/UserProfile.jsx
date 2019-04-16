import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Image, Header, Loader } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h1">{this.props.doc.name}</Header>
          <Grid>
            <Grid.Column width={12}>
              Username: {this.props.doc.username}
              <br/>
              Phone Number: {this.props.doc.phone}
              <br/>
              Email: {this.props.doc.email}
            </Grid.Column>
            <Grid.Column width={4}>
              <Image src={this.props.doc.picture} size='small' />
              <br/>
              Bio: {this.props.doc.bio}
            </Grid.Column>
          </Grid>
        </Container>

    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const user = match.params.email;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profiles');
  return {
    doc: Profiles.findOne(user._id),
    ready: subscription.ready(),
  };
})(UserProfile);
