import React from 'react'
import './Menu.css'
import {Link} from 'react-router-dom'

function Menu() {
    return (
        <div className='navigation'>
            <nav >
                <ul>
                    <li>
                        <Link to="/" exact="true"> 
                            Home
                        </Link></li>
                    <li>
                        <Link to="/projects" exact="true">
                            Projects
                        </Link>
                    </li>

                    <li>
                        <Link to="/products" exact="true">
                            Productos
                        </Link>
                    </li>

                    <li>
                        <Link to="/activities" exact="true">
                            Macro Actividades
                        </Link>
                    </li>
                    <li>
                        <Link to="/report" exact="true">
                            Actividades   
                        </Link>
                    </li>
                    <li>
                        <Link to="/report" exact="true">
                            Tasks   
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Menu