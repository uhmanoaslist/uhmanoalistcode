import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AdminPage from '../pages/AdminPage';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class AdminPageItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell> /*Change to flagged users*/
          <Table.Cell>{this.props.stuff.quantity}</Table.Cell>/*Change to flagged items*/
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
AdminPage.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default AdminPageItem;
