import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import Icon from './icon.png';
import { 
  FaListUl, 
  FaAddressCard, 
  FaUserAstronaut,
  FaPowerOff
} from "react-icons/fa";
import { storage } from '../../utils/storage';
import GlobalSpinner from '../Spinner/Spinner';
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
      <div className={props.position +' '+ props.size} >
        <div className='container'>
          <div className='aside-header'>
            <img src={Icon} alt="icon"/>   
            <h2>
              <a href={`${urlHost}/#/admin/dashboard`} className="dashboard-link"> <span>Panel Admin</span></a>
            </h2>
          </div>
          <ul>
            <li>
              <a href={`${urlHost}/#/admin/account`}><FaUserAstronaut color='white'/> <span>Mi cuenta</span></a>
            </li>
            <li>
              <a href={`${urlHost}/#/admin/acreditacion`}><FaAddressCard color='white'/> <span>Acreditacion</span></a>
            </li>
            <li>
              <a href={`${urlHost}/#/admin/listado`}><FaListUl color='white'/> <span>Listado por Evento</span></a>
            </li>
            <li>
              <button variant="link" onClick={showModal} className="link-logout"><FaPowerOff color='white'/> <span>Salir</span></button>
            </li>
          </ul>
        </div>
      </div>
      }
      </>
    );
}

export default Sidebar;