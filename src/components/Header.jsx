import React from 'react'
import './Header.css'

function Header() {
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
                    <h1>TMS</h1>
               </div>
               <div className='icons'>
                    <div className='information-icon'>
                         <a href='/notification'>
                              <i class="bi bi-info-circle-fill"
                              style={{'cursor':'pointer','fontSize': '2rem', 'color': 'white'}}
                              ></i>  
                         </a>
                    </div>

                    <div className='notification-icon'>
                         <a href='/notification'>
                              <i class="bi bi-bell-fill"
                              style={{'cursor':'pointer','fontSize': '2rem', 'color': 'white'}}
                              ></i>     
                         </a>
                    </div>

                    <div className='account-icon'>
                         <a href='/account'>
                              <i class="bi bi-person-fill"
                              style={{'cursor':'pointer','fontSize': '2rem', 'color': 'white'}}
                              ></i>    
                         </a>
                    </div>
               </div>
          </header>
     )
}


export default Header
   