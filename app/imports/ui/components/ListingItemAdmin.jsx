import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ListingItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.listing.name}</Table.Cell>
          <Table.Cell>{this.props.listing.price}</Table.Cell>
          <Table.Cell>{this.props.listing.seller}</Table.Cell>
          <Table.Cell>{this.props.listing.image}</Table.Cell>
          <Table.Cell>{this.props.listing.description}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ListingItemAdmin.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingItemAdmin;
