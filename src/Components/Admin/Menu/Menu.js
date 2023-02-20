import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../../context/AuthContext';
import { storage } from '../../../utils/storage';
import './menu.css';
import GlobalSpinner from '../../Spinner/Spinner';

function Nabvar() {

  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();

/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
<NavDropdown.Item href="#action/3.2">
Another action
</NavDropdown.Item>
<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item href="#action/3.4">
Separated link
</NavDropdown.Item>
</NavDropdown>*/
/*
  <Nav.Link href={pathUrl + "/#/acreditacion"}>Acreditacion</Nav.Link>
  <Nav.Link href={pathUrl + "/#/listado"}>Listado por Evento</Nav.Link>
*/

const { logOut } = useAuth();
const handleLogOut = () => {
  setLoader(true)
  setTimeout(function(){
    logOut()
    navigate("/login")
    storage.remove('user')
  },1500)
}
var pathUrl = 'https://sgiar.org.ar/dialogos/eventos';
//var pathUrl = 'http://localhost:3001';

return (
    <>
    {loader ? <GlobalSpinner display="block" /> : 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#/acreditacion">Panel Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#" onClick={ handleLogOut } className='logout'>Salir</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    }
    </>
  );
}

export default Nabvar;