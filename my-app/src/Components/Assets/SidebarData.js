import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Reviews',
        path: '/reviews',
        icon: <BsPencilSquare />,
        cName: 'nav-text'
    },
    {
        title: 'Favorites',
        path: '/favorites',
        icon: <FaIcons.FaRegStar />,
        cName: 'nav-text'
    },
    {
        title: 'About',
        path: '/about',
        icon: <IoIcons.IoIosInformationCircleOutline />,
        cName: 'nav-text'
    },
    {
        title: 'LoginSignup',
        path: '/login/signup',
        icon: <IoIcons.IoIosLogIn />,
        cName: 'nav-text'
    },
    {
        title: 'Account',
        path: '/account',
        icon: <VscAccount />,
        cName: 'nav-text'
    }
]
