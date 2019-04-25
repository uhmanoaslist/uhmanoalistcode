import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Image, Header, Loader, Card } from 'semantic-ui-react';
import { Listings } from '/imports/api/listing/listing';
import { Profiles } from '/imports/api/profile/profile';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Listing from '/imports/ui/components/Listing';

import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    if (this.props.currentUser === this.props.doc.email) {
      return (
          <Container>
            <Grid>
              <Grid.Column width={12}>
                <Header as="h1">{this.props.doc.name}</Header>
                <Link to={`/editprofile/${this.props.doc.email}`}>Edit Profile</Link>
                <Header as="h4">Username:</Header> {this.props.doc.username}
                <br/>
                <Header as="h4">Phone Number:</Header> {this.props.doc.phone}
                <br/>
                <Header as="h4">Email:</Header> {this.props.doc.email}
              </Grid.Column>
              <Grid.Column width={4}>
                <Image src={this.props.doc.picture} size='medium'/>
                <Header as="h4">Bio:</Header> {this.props.doc.bio}
              </Grid.Column>
            </Grid>
            <Header as="h1">Items this user sold:</Header>
            <Container>
              <Card.Group itemsPerRow={3}>
                {this.props.listings.map((listing, index) => <Listing key={index} listing={listing}/>)}
              </Card.Group>
            </Container>
          </Container>
      );
    }
    return (
        <Container>
          <Grid>
            <Grid.Column width={12}>
              <Header as="h1">{this.props.doc.name}</Header>
              <Header as="h4">Username:</Header> {this.props.doc.username}
              <br/>
              <Header as="h4">Phone Number:</Header> {this.props.doc.phone}
              <br/>
              <Header as="h4">Email:</Header> {this.props.doc.email}
            </Grid.Column>
            <Grid.Column width={4}>
              <Image src={this.props.doc.picture} size='medium'/>
              <Header as="h4">Bio:</Header> {this.props.doc.bio}
            </Grid.Column>
          </Grid>
          <Header as="h1">Items this user sold:</Header>
          <Container>
            <Card.Group itemsPerRow={3}>
              {this.props.listings.map((listing, index) => <Listing key={index} listing={listing}/>)}
            </Card.Group>
          </Container>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  doc: PropTypes.object,
  currentUser: PropTypes.string,
  listings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const user = match.params.email;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profiles');
  const subscription2 = Meteor.subscribe('Listings');
  return {
    doc: Profiles.findOne({ email: user }),
    listings: Listings.find({ seller: user }).fetch(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: (subscription.ready() && subscription2.ready()),
  };
})(UserProfile);
