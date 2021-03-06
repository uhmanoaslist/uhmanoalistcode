import React from 'react';
import { Reports, ReportSchema } from '/imports/api/report/report';
import { Listings } from '/imports/api/listing/listing';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class AddReport extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Report failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Report succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { description, seller, item, itemName } = data;
    Reports.insert({ description, seller, item, itemName }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Report</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ReportSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='description'/>
                <ErrorsField/>
                <HiddenField name='seller' value={this.props.doc.seller}/>
                <HiddenField name='item' value={this.props.doc._id}/>
                <HiddenField name='itemName' value={this.props.doc.name}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
AddReport.propTypes = {
  doc: PropTypes.object,
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
    ready: subscription.ready(),
  };
})(AddReport);
