import React from 'react'
import './Header.css'
import logo from '../assets/logo/logo.png'
//import {useState} from 'react'
//import Menu from './Menu'

function Header() {

     function generateProjectNames(){

     }
     
     return (
               <header className='header'>
                    <div className='search-input'>
                         <div class="form-outline">
                              <input type="search" id="form1" class="form-control" placeholder="Search..."/>
                         </div>    
                    </div>
                    <div className='logo'>
                         <img src={logo}  width='125' height='50'/>
                    </div>
               <div>
                    <label id='welcome' style={{
                         color: 'white',
                         fontSize: '1rem',
                         padding: '10px',
                         fontWeight: '500'

                    }}/>
               </div> 
               <div>
                    <label id='role' hidden={true}></label>
               </div>
               <div>
                   <label id='userprojects' hidden={true}></label>
                   <label id='userarea' hidden={true}></label>
               </div>
               <a href='/'>
                     <div style={{'cursor':'pointer','fontSize': '1.1rem', 'color': 'white',fontWeight: '500'}}>Log out</div>
                </a>
          </header>
     )
}


export default Header
   