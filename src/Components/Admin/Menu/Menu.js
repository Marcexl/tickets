import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../../context/AuthContext';
import { storage } from '../../../utils/storage';
import './menu.css';
import GlobalSpinner from '../../Spinner/Spinner';

function Nabvar() {

  const [loader,setLoader] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const userData = storage.get("user");
  const userName = userData.user;
  const navigate = useNavigate();
  const urlHost = process.env.REACT_APP_HOST;

  const { logOut } = useAuth();
  const handleLogOut = () => {
    setLoader(true)
    setTimeout(function(){
      logOut()
      navigate("/login")
      storage.remove('user')
    },1500)
  }

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
            <h4>Hola {userName}</h4>
            <Nav.Link href={`${urlHost}/#/acreditacion`}>Acreditacion</Nav.Link>
            <Nav.Link href={`${urlHost}/#/listado`}>Listado por Evento</Nav.Link>
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