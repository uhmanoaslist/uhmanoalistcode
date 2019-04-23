import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Image, Header, Loader, Table, Button } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: 'Delete failed: $(error.message}' });
    } else {
      Bert.alert({ type: 'danger', message: 'Delete succeeded' });
    }
    }
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>,
    <Table.Row>
      <Table.Cell>{this.props.name}</Table.Cell>
      <Table.Cell>{this.props.price}</Table.Cell>
      <Table.Cell>{this.props.description}</Table.Cell>
      <Table.Cell>
        <Button basic onClick={this.onClick}>Delete</Button>
      </Table.Cell>
    </Table.Row>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h1">{this.props.doc.name}</Header>
          <Grid>
            <Grid.Column width={12}>
              <Header as="h4">Username:</Header> {this.props.doc.username}
              <br/>
                <Header as="h4">Phone Number:</Header> {this.props.doc.phone}
              <br/>
              <Header as="h4">Email:</Header> {this.props.doc.email}
            </Grid.Column>
            <Grid.Column width={4}>
              <Image src={this.props.doc.picture} size='small' />
              <Header as="h4">Bio:</Header> {this.props.doc.bio}
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
    doc: Profiles.findOne({ email: user }),
    ready: subscription.ready(),
  };
})(UserProfile);
