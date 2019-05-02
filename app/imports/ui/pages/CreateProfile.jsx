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
import { Redirect } from 'react-router-dom';

/** Renders the Page for editing a single document. */
class CreateProfile extends React.Component {
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
      this.setState({ redirectToReferer: true });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, username, phone, picture, bio } = data;
    const email = Meteor.user().username;
    Profiles.insert({ name, username, email, phone, picture, bio }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to={'/'}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Create Profile</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ProfileSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='name'/>
                <TextField name='username'/>
                <TextField name='phone'/>
                <TextField name='picture'/>
                <LongTextField name='bio'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='email' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }

}

export default CreateProfile;
