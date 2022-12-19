import React from 'react'
import './Menu.css'
import {Link} from 'react-router-dom'
import { Button } from 'bootstrap'

function Menu(props) {


    const menuKeys = ['dahboard','menu-home', 'menu-projects','newsletter']
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
                        <li  className='home'>
                            <Link id={menuKeys[1]} onClick={activeBackGroud}  className='link' to="/dashboard" exact="true"> 
                                Dashboard
                            </Link>
                        </li>
                        <li  className='projects'>
                            <Link id={menuKeys[2]} onClick={activeBackGroud} className='link' to="/projects" exact="true" >
                                Projects
                            </Link>
                        </li>
                        <li className='home'>
                            <Link id={menuKeys[3]} onClick={activeBackGroud}  className='link' to="newsletter" exact="true"> 
                                NewsLetter
                            </Link>
                        </li>
                       
                    </ul>
            </nav>
        </div>)

    return a
}
export default Menu