import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Listing extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image floated='center' size='large' src={this.props.listing.image} />
            <Card.Header>{this.props.listing.name} </Card.Header>
            <Card.Meta> ${this.props.listing.price}</Card.Meta>
            <Card.Meta>{this.props.listing.seller}</Card.Meta>
            <Card.Description>
              {this.props.listing.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.listing._id}`}>Buy</Link>
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
Listing.propTypes = {
  listing: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Listing);
