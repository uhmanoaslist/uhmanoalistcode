import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class Report extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.report.seller}</Table.Cell> {/*Change to flagged users*/}
          <Table.Cell>{this.props.report.description}</Table.Cell> {/*Change to flagged items*/}
          <Table.Cell><Link to={`view/${this.props.report.item}`}>{this.props.report.itemName}</Link></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
Report.propTypes = {
  report: PropTypes.object.isRequired,
};

export default withRouter(Report);
