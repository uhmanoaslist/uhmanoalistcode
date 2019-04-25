import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Profiles, ProfileSchema } from '/imports/api/profile/profile';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, username, phone, picture, bio, _id } = data;
    Profiles.update(_id, { $set: { name, username, phone, picture, bio } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.props.currentUser === this.props.doc.email) {
      return (
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Edit Profile</Header>
              <AutoForm schema={ProfileSchema} onSubmit={this.submit} model={this.props.doc}>
                <Segment>
                  <TextField name='name'/>
                  <TextField name='username'/>
                  <TextField name='phone'/>
                  <TextField name='picture'/>
                  <LongTextField name='bio'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='email'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
      );
    }
    return (
        <Header as="h2" textAlign="center">You are not allowed to edit this profile</Header>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params.email;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profiles');
  return {
    doc: Profiles.findOne({ email: documentId }),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: subscription.ready(),
  };
})(EditProfile);
