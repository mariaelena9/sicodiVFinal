import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from './Sidebar';

const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    border-bottom: solid white .5px;

&:hover{
    background: #2b030e;
    border-left: 4px solid #c04d00;
    cursor: pointer;
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    background: #460d1c;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;

&:hover{
    background: #2b030e;
    cursor: pointer;
}
`

const SubMenu = ({item}) => {
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

    return(
        <>
            <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>    
                </div>    
                <div>
                    {item.subNav && subnav 
                        ? item.iconOpened
                        : item.subNav 
                        ? item.iconClosed
                        :null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return(
                <DropdownLink to = {item.path} key={index}>
                   {item.icon} 
                   <SidebarLabel>{item.title}</SidebarLabel>
                </DropdownLink>
                )
            })}
        </>
    )
}

export default SubMenu