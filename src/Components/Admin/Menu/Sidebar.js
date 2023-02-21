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
import './menu.css';

function Sidebar() {
  const [loader,setLoader] = useState(false);
  const urlHost = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleLogOut = () => {
    setLoader(true)
    setTimeout(function(){
      logOut()
      navigate("/admin/login")
      storage.remove('user')
    },1500)
  }

  return (
    <>
    {loader ? <GlobalSpinner display="block" /> : 
      <div className='aside'>
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
            <a href="#" onClick={ handleLogOut }><FaPowerOff color='white'/> Salir</a>
          </li>
        </ul>
      </div>
      }
      </>
    );
}

export default Sidebar;