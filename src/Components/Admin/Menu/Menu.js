import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { storage } from '../../../utils/storage';
import './menu.css';

function Nabvar(props) {
  
  const userData = storage.get("user");
  const userName = userData.user;

return (
    <Navbar bg="light" variant="dark">
      <Container fluid className='p-4'>
        <Navbar.Brand>{props.page}</Navbar.Brand>
        <Nav>
          <h4>Hola {userName}</h4>
        </Nav>
      </Container>
      </Navbar>
  );
}

export default Nabvar;