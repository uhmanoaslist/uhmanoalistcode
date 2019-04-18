import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { Listings } from '/imports/api/listing/listing';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Listing from '/imports/ui/components/Listing';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Category extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Items</Header>
          <Card.Group itemsPerRow={3}>
            {this.props.listings.map((listing, index) => <Listing key={index} listing={listing}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Category.propTypes = {
  doc: PropTypes.string,
  listings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const doc = match.params.category;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Listings');
  return {
    listings: Listings.find({ category: doc }).fetch(),
    ready: subscription.ready(),
  };
})(Category);
