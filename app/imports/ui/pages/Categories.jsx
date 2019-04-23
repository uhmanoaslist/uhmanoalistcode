import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Categories extends React.Component {
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Categories</Header>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Link to={'/category/Furniture'}>Furniture</Link>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Link to={'/category/Textbooks'}>Textbooks</Link>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Link to={'/category/School_Supplies'}>School Supplies</Link>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Link to={'/category/Transportation'}>Transportation</Link>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Link to={'/category/Electronics'}>Electronics</Link>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Link to={'/category/Electronic Accessories'}>Electronic Accessories</Link>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Link to={'/category/Mens Clothing'}>Mens Clothing</Link>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Link to={'/category/Womens Clothing'}>Womens Clothing</Link>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Link to={'/category/Sporting Goods'}>Sporting Goods</Link>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Link to={'/category/Miscellaneous'}>Miscellaneous</Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

Categories.propTypes = {
  currentUser: PropTypes.string,
};

const CategoriesContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Categories);

export default withRouter(CategoriesContainer);
