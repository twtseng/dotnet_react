import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Fun Games!</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Games
                  </DropdownToggle>
                  <DropdownMenu right>
                  <DropdownItem>
                        <NavLink tag={Link} className="text-dark" to="/computerjs">Computer JS</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink tag={Link} className="text-dark" to="/zogo">Zogo Lava Dodge</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <NavLink tag={Link} className="text-dark" to="/destroydeathstar">Destroy the Death Star</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <NavLink tag={Link} className="text-dark" to="/eatleaves">Eat Leaves</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/politegame">Polite Game</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <NavLink tag={Link} className="text-dark" to="/wardenchess">Warden Chess</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <LoginMenu>
                </LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
