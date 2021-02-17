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