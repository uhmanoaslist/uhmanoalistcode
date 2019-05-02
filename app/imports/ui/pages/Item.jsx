import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Image, Header, Loader, Button } from 'semantic-ui-react';
import { Listings } from '/imports/api/listing/listing';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, Redirect } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.state = { redirectToReferer: false };
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
      this.setState({ redirectToReferer: true });
    }
  }

  /** On submit, insert the data. */
  onClick() {
    Listings.remove(this.props.doc._id, this.deleteCallback);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    if (this.state.redirectToReferer) {
      return <Redirect to={'/list'}/>;
    }
    if (this.props.currentUser === this.props.doc.seller) {
      return (
          <Container>
            <Header as="h1">{this.props.doc.name}</Header>
            <Grid>
              <Grid.Column width={7}>
                <Image src={this.props.doc.image} size='big'/>
                <br/>
                Description: {this.props.doc.description}
              </Grid.Column>
              <Grid.Column width={9}>
                Price: <Header as="h2">{this.props.doc.price}</Header>
                <Link to={`/edit/${this.props.doc._id}`}>Edit Listing</Link>
                <br/>
                <Button basic onClick={this.onClick}>Delete</Button>
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
                <Header as="h5">If you want to buy this item, contact the seller!</Header>
                <br/>
                <Link to={`/user/${this.props.doc.seller}`}>{this.props.seller.username} Profile Page</Link>
                <br/>
                <br/>
                Category: {this.props.doc.category}
              </Grid.Column>
            </Grid>
          </Container>
      );
    }
    if (this.props.currentUser !== this.props.doc.seller && Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (
          <Container>
            <Header as="h1">{this.props.doc.name}</Header>
            <Grid>
              <Grid.Column width={7}>
                <Image src={this.props.doc.image} size='big'/>
                <br/>
                Description: {this.props.doc.description}
              </Grid.Column>
              <Grid.Column width={9}>
                Price: <Header as="h2">{this.props.doc.price}</Header>
                <Button basic onClick={this.onClick}>Delete</Button>
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
                <Header as="h5">If you want to buy this item, contact the seller!</Header>
                <br/>
                <Link to={`/user/${this.props.doc.seller}`}>{this.props.seller.username} Profile Page</Link>
                <br/>
                <br/>
                Category: {this.props.doc.category}
              </Grid.Column>
            </Grid>
          </Container>
      );
    }
    return (
        <Container>
          <Header as="h1">{this.props.doc.name}</Header>
          <Grid>
            <Grid.Column width={7}>
              <Image src={this.props.doc.image} size='big'/>
              <br/>
              Description: {this.props.doc.description}
            </Grid.Column>
            <Grid.Column width={9}>
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
              <Header as="h5">If you want to buy this item, contact the seller!</Header>
              <br/>
              <br/>
              Category: {this.props.doc.category}
              <br/>
              <br/>
              <Link to={`/report/${this.props.doc._id}`}>Report this item</Link>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Item.propTypes = {
  doc: PropTypes.object,
  currentUser: PropTypes.string,
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
      currentUser: Meteor.user() ? Meteor.user().username : '',
      ready: (subscription.ready() && subscription2.ready()),
    };
  }
  return {
    doc: {},
    seller: {},
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: (subscription.ready() && subscription2.ready()),
  };
})(Item);
