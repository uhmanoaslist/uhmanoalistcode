import React from 'react';
import { Grid, Button, Header, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {

    if (this.props.currentUser) {
      return (

          <div className='uhmanoaslist-landing-page'>
            <Grid container stackable centered columns={1}>

              <Grid.Column textAlign='center'>
                <h1 className='header' inverted>Welcome to UHManoasList</h1>
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
                <div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
      );
    }
    return (

        <div className='uhmanoaslist-landing-page'>
          <Grid container stackable centered columns={1}>

            <Grid.Column textAlign='center'>
              <h1 className='header' inverted>Welcome to UHManoasList</h1>
              <h3 className='header2' inverted>Sign up or Log in to buy and sell items!</h3>
              <div>
                <Button.Group>
                  <Button as={NavLink} exact to="/signup" positive>Sign Up</Button>
                  <Button.Or />
                  <Button as={NavLink} exact to="/signin" positive>Log In</Button>
                </Button.Group>
              </div>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}


Landing.propTypes = {
  currentUser: PropTypes.string,
};

const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

export default withRouter(LandingContainer);
