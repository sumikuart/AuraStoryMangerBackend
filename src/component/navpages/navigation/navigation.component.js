import React, { Component } from 'react'
import {NavLink} from "react-router-dom";

import './navigation.style.css'

class Navbar extends Component {

    state={
    
    }



    render(){
        return(
            <div className="navbarstyle">

        <nav>
            <ul>
                <li><NavLink to="/home"> Home </NavLink></li>
                <li><NavLink to="/home/files"> File Maneger </NavLink></li>
            </ul>
        </nav>
               


            </div>
        )
    }

}

export default Navbar