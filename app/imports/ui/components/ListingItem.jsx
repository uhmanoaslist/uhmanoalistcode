import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListingItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.listing.name}</Table.Cell>
          <Table.Cell>{this.props.listing.price}</Table.Cell>
          <Table.Cell>{this.props.listing.seller}</Table.Cell>
          <Table.Cell>{this.props.listing.image}</Table.Cell>
          <Table.Cell>{this.props.listing.description}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.listing._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ListingItem);
