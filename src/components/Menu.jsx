import React from 'react'
import './Menu.css'
import {Link} from 'react-router-dom'
import { Button } from 'bootstrap'
import { useState } from 'react'

function Menu(props) {

    const [menuVisible, setMenuVisibility ] = useState(true)

    const menuKeys = ['home','dahboard','menu-projects','newsletter','relatorios','usuarios']
    let a = []

    function activeBackGroud(e){
        
        const selectedId = e.target.id

        for (let key in menuKeys){
            
            if ( menuKeys[key] === selectedId){
                document.getElementById(selectedId).parentElement.style.backgroundColor = '#00c6ff'
            }else{
                document.getElementById(menuKeys[key]).parentElement.style.backgroundColor = 'transparent'
            }
        }

    }
      a.push(
            <div className='navigation'>
                <nav >
                    <ul>

                        <li className='home'>
                            <Link id={menuKeys[0]} onClick={activeBackGroud}  className='link' to="/" exact="true"> 
                                Home
                            </Link>
                        </li>
                        <li  className='dashboard' hidden = {menuVisible} >
                            <Link id={menuKeys[1]} onClick={activeBackGroud}  className='link' to="/dashboard" exact="true"> 
                                Dashboard
                            </Link>
                        </li>
                        <li  className='projects' hidden={menuVisible}>
                            <Link id={menuKeys[2]} onClick={activeBackGroud} className='link' to="/projects" exact="true" >
                                Projectos
                            </Link>
                        </li>
                        <li className='newsletter' hidden={menuVisible}>
                            <Link id={menuKeys[3]} onClick={activeBackGroud}  className='link' to="/newsletter" exact="true"> 
                                NewsLetter
                            </Link>
                        </li>
                        <li className='relatorios' hidden={menuVisible}>
                            <Link id={menuKeys[4]} onClick={activeBackGroud}  className='link' to='/relatorios' exact="true"> 
                                Relatorios
                            </Link>
                        </li>
                        <li className='usuarios' hidden={menuVisible}>
                            <Link id={menuKeys[5]} onClick={activeBackGroud}  className='link' to='/usuarios' exact="true"> 
                                Usuarios
                            </Link>
                        </li>
                    </ul>
            </nav>
        </div>)

    return a
}
export default Menu