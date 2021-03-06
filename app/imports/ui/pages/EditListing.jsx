import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Listings, ListingSchema } from '/imports/api/listing/listing';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import NumField from 'uniforms-semantic/NumField';
import HiddenField from 'uniforms-semantic/HiddenField';
import SelectField from 'uniforms-semantic/SelectField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import SubmitField from 'uniforms-semantic/SubmitField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditListing extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, price, image, description, category, _id } = data;
    Listings.update(_id, { $set: { name, price, image, description, category } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.props.currentUser === this.props.doc.seller) {
      return (
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Edit Listing</Header>
              <AutoForm schema={ListingSchema} onSubmit={this.submit} model={this.props.doc}>
                <Segment>
                  <TextField name='name'/>
                  <NumField name='price' decimal={true}/>
                  <TextField name='image'/>
                  <LongTextField name='description'/>
                  <SelectField name='category'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='seller'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
      );
    }
    return (
        <Header as="h2" textAlign="center">You are not allowed to edit this listing</Header>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditListing.propTypes = {
  doc: PropTypes.object,
  currentUser: PropTypes.string,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Listings');
  return {
    doc: Listings.findOne(documentId),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: subscription.ready(),
  };
})(EditListing);
