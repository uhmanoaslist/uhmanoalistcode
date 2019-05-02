import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Image, Header, Loader } from 'semantic-ui-react';
import { Listings } from '/imports/api/listing/listing';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Item extends React.Component {

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
            <Grid.Column width={6}>
              <Image src={this.props.doc.image} size='big'/>
            </Grid.Column>
            <Grid.Column width={10}>
              Price: <Header as="h2">{this.props.doc.price}</Header>
              <Header as="h3">Contact Information:</Header>
              Username: {this.props.seller.username}
              <br/>
              Name: {this.props.seller.name}
              <br/>
              Phone Number: {this.props.seller.phone}
              <br/>
              Email: {this.props.seller.email}
              <br/>
              <Link to={`/user/${this.props.doc.seller}`}>{this.props.seller.username} Profile Page</Link>
              <br/>
              <br/>
              Description: {this.props.doc.description}
            </Grid.Column>
          </Grid>
          <br/>
          Category: {this.props.doc.category}
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Item.propTypes = {
  doc: PropTypes.object,
  seller: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Listings');
  const subscription2 = Meteor.subscribe('Profiles');
  const item = Listings.findOne(documentId);
  if (item !== undefined) {
    return {
      doc: item,
      seller: Profiles.findOne({ email: item.seller }),
      ready: (subscription.ready() && subscription2.ready()),
    };
  }
  return {
    doc: {},
    seller: {},
    ready: (subscription.ready() && subscription2.ready()),
  };
})(Item);
