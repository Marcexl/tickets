import Icon from './icon.png';
import { 
  FaListUl, 
  FaAddressCard, 
  FaUserAstronaut
} from "react-icons/fa";

import './menu.css';

function Sidebar() {
  const urlHost = process.env.REACT_APP_HOST;

  return (
      <div className='aside'>
        <div className='aside-header'>
          <img src={Icon} alt="icon"/>   
          <h2>Panel Admin</h2>
        </div>
        <ul>
        <li>
              <a href={`${urlHost}/#/account`}><FaUserAstronaut color='white'/> Datos de la cuenta</a>
            </li>
            <li>
              <a href={`${urlHost}/#/acreditacion`}><FaAddressCard color='white'/> Acreditacion</a>
            </li>
            <li>
              <a href={`${urlHost}/#/listado`}><FaListUl color='white'/> Listado por Evento</a>
            </li>
        </ul>
      </div>
    );
}

export default Sidebar;