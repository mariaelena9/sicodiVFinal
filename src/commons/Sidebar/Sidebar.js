/* @SIDEBAR */

//Import React library
import React, {useState} from 'react';

//Import styled-components
import styled from 'styled-components';
import style from './Sidebar.css'

//Import react-router-dom
import { Link } from 'react-router-dom';

//Import assets
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import * as ImIcons from 'react-icons/im';

//Import components
import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu';

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
    <IconContext.Provider value={{color:'#fff'}}>
        

        <div className='SidebarNav'sidebar={sidebar}>
            
            <div className='SidebarWrap'>
                <div className='NavIcon'> 
                    <ImIcons.ImUser/>
                    <p className='Usuario'>Michelle Salinas Tirado</p>
                    <p className='Cargo'>Dirección Gral. de Sistemas y Tec. Informática</p>
                    
                </div>
                <hr/>
                {/* <div className='NavIcon' to="#">
                    <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </div> */}
                {SidebarData.map((item, index) => {
                    return <SubMenu item={item} key={index}/>;
                })}
            </div>
        </div>
    </IconContext.Provider>
    </>
  )
}

export default Sidebar;

