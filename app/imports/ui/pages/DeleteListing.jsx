import React from 'react';
import { Listings } from '/imports/api/listing/listing';
import { Button } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders the Page for adding a document. */
class DeleteListing extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  onClick() {
    Listings.remove(this.props.listings._id, this.deleteCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Button basic onClick={this.onClick}>Confirm to delete</Button>
    );
  }
}

DeleteListing.propTypes = {
  doc: PropTypes.object,
  currentUser: PropTypes.string,
  listings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Listings');
  return {
    listings: Listings.find({}).fetch(),
    ready: subscription.ready(),
  };
})(DeleteListing);
