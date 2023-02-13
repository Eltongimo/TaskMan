import React from 'react'
import './Menu.css'
import {Link} from 'react-router-dom'
import { Button } from 'bootstrap'
import { useState } from 'react'

function Menu(props) {

    const [menuVisible, setMenuVisibility ] = useState(true)

    const menuKeys = ['home','dahboard','menu-projects','newsletter','relatorios','usuarios','conteudo','newsletterhome','lat']
    let a = []

    function activeBackGroud(e){
        
        const selectedId = e.target.id

        for (let key in menuKeys){
            
            if ( menuKeys[key] === selectedId){
                document.getElementById(selectedId).parentElement.style.backgroundColor = '#001489'
                document.getElementById(selectedId).style.color = 'white'
            }else{
                document.getElementById(menuKeys[key]).parentElement.style.backgroundColor = 'transparent'
                document.getElementById(menuKeys[key]).style.color = 'black'

            }
        }

    }
      a.push(
            <div className='navigation'>
                <nav >
                    <ul>
                        <li className='home'>
                            <Link id={menuKeys[0]} onClick={activeBackGroud}  className='link' to="/" exact="true" > 
                                Home
                            </Link>
                        </li>
                        <li  className='dashboard' hidden = {menuVisible} >
                            <Link id={menuKeys[1]} onClick={activeBackGroud}  className='link' to="/showdashboard" exact="true"> 
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
                        <li className='conteudo' hidden={menuVisible}>
                            <Link id={menuKeys[6]} onClick={activeBackGroud}  className='link' to='/edithomecontent' exact="true"> 
                                Gerir Conteudo
                            </Link>
                        </li>
                        
                        <li className='newsletterhome'>
                            <Link id={menuKeys[7]} onClick={activeBackGroud}  className='link' to="/newsletterhome" exact="true"> 
                                Newsletter
                            </Link>
                        </li>
                        
                        <li className='lat' hidden={menuVisible}>
                            <Link id={menuKeys[8]} onClick={activeBackGroud}  className='link' to="/showlats" exact="true"> 
                                LAT
                            </Link>
                        </li>
                    </ul>
            </nav>
        </div>)

    return a
}
export default Menu