import React from 'react'
import './Header.css'
import logo from '../assets/logo/logo.png'
import {useState} from 'react'
import Menu from './Menu'

function Header() {
/*
     return (
     <nav class="navbar navbar-expand-lg navbar-light bg-light" 
          style={{width: '100%'}}
     >
     <div class="container-fluid">
     <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
          </button>
     <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
               <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
               </li>
               <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
               </li>
               <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
               </li>
               <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
               </li>
          </ul>
               <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
               </form>
          </div>
     </div>
     </nav>
     ) */

     return (
               <header className='header'>
                    <div className="home">
                         <a href='/'>
                              <i class="bi bi-house-door-fill" style={{'cursor':'pointer','fontSize': '2rem', 'color': 'white'}}></i>
                         </a>
                    </div>
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
          </header>
     )
}


export default Header
   