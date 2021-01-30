import React from 'react'
import './Menu.css'
import { Route, Link} from 'react-router-dom'

import Sticky from './Sticky'



export default props =>
    <div className='navigation'>
        <nav >
            <ul>
                <li>
                    <Link to="/" exact> 
                        Home
                    </Link></li>
                <li>
                    <Link to="/mytasks" exact>
                        Tasks   
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
    