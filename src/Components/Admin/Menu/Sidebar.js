import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';
import Icon from './icon.png';
import { 
  FaListUl, 
  FaAddressCard, 
  FaUserAstronaut,
  FaPowerOff
} from "react-icons/fa";
import { storage } from '../../../utils/storage';
import GlobalSpinner from '../../Spinner/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Sidebar(props) {
  const [loader,setLoader] = useState(false);
  const [show, setModal] = useState(false);
  const urlHost = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const { logOut } = useAuth();
  
  const closeModal = () => setModal(false);
  const showModal = () => setModal(true);

  const handleLogOut = () => {
    setLoader(true)
    closeModal()
    setTimeout(function(){
      logOut()
      navigate("/admin/login")
      storage.remove('user')
    },1500)
  }

  return (
    <>
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Cerrar sesion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Estas seguro que deseas cerrar la sesion?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleLogOut}>
          Si
        </Button>
      </Modal.Footer>
    </Modal>
    {loader ? <GlobalSpinner display="block" /> : 
      <div className={props.position}>
        <div className='aside-header'>
          <img src={Icon} alt="icon"/>   
          <h2>
            <a href={`${urlHost}/#/admin/dashboard`} className="dashboard-link">Panel Admin</a>
          </h2>
        </div>
        <ul>
          <li>
            <a href={`${urlHost}/#/admin/account`}><FaUserAstronaut color='white'/>Mi cuenta</a>
          </li>
          <li>
            <a href={`${urlHost}/#/admin/acreditacion`}><FaAddressCard color='white'/> Acreditacion</a>
          </li>
          <li>
            <a href={`${urlHost}/#/admin/listado`}><FaListUl color='white'/> Listado por Evento</a>
          </li>
          <li>
            <button variant="link" onClick={showModal} className="link-logout"><FaPowerOff color='white'/> Salir</button>
          </li>
        </ul>
      </div>
      }
      </>
    );
}

export default Sidebar;