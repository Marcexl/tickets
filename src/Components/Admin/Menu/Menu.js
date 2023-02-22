import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Sidebar from './Sidebar';
import { storage } from '../../../utils/storage';
import { RxHamburgerMenu } from "react-icons/rx";

function Menus(props) {
  const [sideBar, alterSideBar] = useState(false);
  const handleChange = () => {
     return alterSideBar(!sideBar);
  };
  const userData = storage.get("user");
  const userName = userData.user;

  return (
    <>
    <Navbar bg="light" variant="dark">
      <Container fluid className='p-4'>
        <Navbar.Brand>{props.page}</Navbar.Brand>
        <Nav>
          <h4>Hola {userName}</h4>
        </Nav>
        <RxHamburgerMenu className='hamburger' onClick={() => handleChange()}/>
      </Container>
    </Navbar>
    <Sidebar position={sideBar ? "aside" : "aside show"}/>
    </>
  );
}

export default Menus;