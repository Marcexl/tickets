import React, { useEffect, useState, useRef} from "react";
import Menus from './Menu'
import Sidebar from './Sidebar'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { storage } from '../../utils/storage';
import Container from 'react-bootstrap/Container';
import { RxHamburgerMenu, RxCross1} from "react-icons/rx";

const Layout = ({ children }) => {

    // sidebar show or hide
    const [sideBar, alterSideBar] = useState(true);
    const handleChange = () => {
       return alterSideBar(!sideBar);
    };

    // smaller or not sideber
    const [extend, extendSidebar] = useState(false);
    const node = useRef(""); 
    const handingRef = ()=>{
      if(extend){
        storage.remove('sidebar')
        extendSidebar(false)
      }
      else
      {
        storage.set('sidebar','smaller')
        extendSidebar(true)
      }
    }

    useEffect( () =>{
      let sidebar = storage.get('sidebar')? true : false;
      extendSidebar(sidebar)
    },[])
  
  return (
    <>
        <Menus page="Escritorio" size={extend ? "smaller" : "" }/>
        <div className={sideBar ? "hamburger" : "hamburger close"} onClick={() => handleChange()}>
            <div className="hamburger-container">
                <RxHamburgerMenu className='hamburger-icon'/>
                <RxCross1 className='close-icon'/>
            </div>
        </div>
        <Sidebar position={sideBar ? "aside" : "aside show"} size={extend ? "smaller" : ""} />
        <Container fluid className={extend ? "smaller" : "sidebar"}>
            <div className='arrow-extend' onClick={handingRef}>
                <MdKeyboardArrowLeft id='arrow-icon' />
            </div>
            {children}
        </Container>
    </>
  )
}

export default Layout