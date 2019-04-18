import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Link } from 'semantic-ui-react';
import { Listings } from '/imports/api/listing/listing';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Listing from '/imports/ui/components/Listing';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCategories extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Items</Header>
          <Card.Group itemsPerRow={3}>
            <Card.Header>BUY</Card.Header>
            <Card.Meta>Buy Items</Card.Meta>
            <Card.Description>
              Look around to buy
            </Card.Description>
          <Card.Content extra>
            <Link to={`/edit/${this.props.contact._id}`}>Edit</Link>
          </Card.Content>
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListCategories.propTypes = {
  listings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Listings');
  return {
    listings: Listings.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListCategories);
