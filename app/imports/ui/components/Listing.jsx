import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Listing extends React.Component {
  render() {
    if (this.props.currentUser === this.props.listing.seller) {
      return (
          <Card centered>
            <Card.Content>
              <Image floated='center' size='large' src={this.props.listing.image}/>
              <Card.Header>{this.props.listing.name} </Card.Header>
              <Card.Meta> ${this.props.listing.price}</Card.Meta>
              <Card.Meta>{this.props.listing.seller}</Card.Meta>
              <Card.Description>
                {this.props.listing.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to={`/view/${this.props.listing._id}`}>View</Link>
            </Card.Content>
            <Card.Content extra>
              <Link to={`/edit/${this.props.listing._id}`}>Edit</Link>
            </Card.Content>
          </Card>
      );
    }
    return (
        <Card centered>
          <Card.Content>
            <Image floated='center' size='large' src={this.props.listing.image}/>
            <Card.Header>{this.props.listing.name} </Card.Header>
            <Card.Meta> ${this.props.listing.price}</Card.Meta>
            <Card.Meta>{this.props.listing.seller}</Card.Meta>
            <Card.Description>
              {this.props.listing.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/view/${this.props.listing._id}`}>View</Link>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/report/${this.props.listing._id}`}>Report</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Listing.propTypes = {
  listing: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ListingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Listing);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ListingContainer);
