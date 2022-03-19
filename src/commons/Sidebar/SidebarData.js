import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as VscIcons from 'react-icons/vsc'
import * as ImIcons from 'react-icons/im';


export const SidebarData = [
    
    { 
        title: 'Inicio',
        path: '/inicio',
        icon: <AiIcons.AiFillHome/>
    },

    { 
        title: 'Directorio',
        path: '/directorio',
        icon: <MdIcons.MdImportContacts/>,
    },

    { 
        title: 'Nueva Correspondencia',
        path: '/nueva-correspondencia',
        icon: <ImIcons.ImFileText2/>,
    },

    { 
        title: 'Enviados',
        path: '/enviados',
        icon: <ImIcons.ImBoxRemove/>,
    },

    { 
        title: 'Recibidos',
        path: '/enviados',
        icon: <ImIcons.ImBoxAdd/>,
    },

    { 
        title: 'Historico',
        path: '/historico',
        icon: <ImIcons.ImHistory/>,
    },
    
    { 
        title: 'Reportes',
        path: '/reportes',
        icon: <ImIcons.ImStatsDots/>,
    },


    /* REPORTS */
//     { 
//     title: 'Reports',
//     path: '/reports',
//     icon: <AiIcons.AiFillHome/>,
//     iconClosed: <RiIcons.RiArrowDownSLine/>,
//     iconOpened: <RiIcons.RiArrowUpSLine/>,
//     subNav: [
//         {
//             title: 'Reports',
//             path: '/reports/reports1',
//             icon: <IoIcons.IoIosPaper/>
//         },
//         {
//             title: 'Reports 2',
//             path: '/reports/reports2',
//             icon: <IoIcons.IoIosPaper/>
//         },
//         {
//             title: 'Reports 3',
//             path: '/reports/reports3',
//             icon: <IoIcons.IoIosPaper/>
//         },
//     ]
//  },

 /* PRODUCTS */
//  { 
//     title: 'Products',
//     path: '/products',
//     icon: <AiIcons.AiFillHome/>,
//     iconClosed: <RiIcons.RiArrowDownSLine/>,
//     iconOpened: <RiIcons.RiArrowUpSLine/>,
//     subNav: [
//         {
//             title: 'Reports',
//             path: '/reports/reports1',
//             icon: <IoIcons.IoIosPaper/>
//         },
//         {
//             title: 'Reports',
//             path: '/reports/reports2',
//             icon: <IoIcons.IoIosPaper/>
//         },
//         {
//             title: 'Reports',
//             path: '/reports/reports3',
//             icon: <IoIcons.IoIosPaper/>
//         },
        
//     ]
//  }
]

// export default SidebarData;