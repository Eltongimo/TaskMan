import React from 'react'
import './Menu.css'
import {Link} from 'react-router-dom'
import { Button } from 'bootstrap'

function Menu(props) {

    let a = []

    if (props.isLogged){
        a.push(
            <div className='navigation'>
            <nav >
                <ul>
                    <li>
                        <button>
                            <Link to="/" exact="true"> 
                                Home
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button>
                            <Link to="/projects" exact="true">
                                Projects
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button>
                            <Link to="/products" exact="true">
                                Productos
                            </Link>
                        </button>
                    </li>

                    <li>
                        <button>
                            <Link to="/macroactivities" exact="true">
                                Macro Actividades
                            </Link>
                        </button>
                       </li>
                    <li>
                        <button>
                            <Link to="/activities" exact="true">
                                Actividades   
                            </Link>
                        </button>
                    </li>
                </ul>
            </nav>
         </div>
        )
    }else{
        a.push(
            <div className='navigation'>
                <nav >
                    <ul>
                        <li>
                            <button className='button-menu'>
                                <Link to="/" exact="true"> 
                                    Home
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='button-menu'>
                                <Link to="/projects" exact="true">
                                    Projects
                                </Link>
                            </button>
                        </li>
                    </ul>
            </nav>
        </div>)
    }

    return a
}
export default Menu