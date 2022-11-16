import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Image src="https://media.discordapp.net/attachments/1039357989527760963/1041216966242873394/image.png?width=491&height=585" height="100px" />
        </Navbar.Brand>
        <Navbar.Brand>
          <h1>UIZZACIOUS</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="menu-quiz-nav" as={NavLink} to="/menu" key="menu">Make-A-Quiz</Nav.Link>,
              <Nav.Link id="take-quiz--nav" as={NavLink} to="/take" key="take">Take Quiz</Nav.Link>,
              <Nav.Link id="profile-nav" as={NavLink} to="/profile" key="profile">Profile</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="me-auto justify-content-end">
            {currentUser ? ([
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
