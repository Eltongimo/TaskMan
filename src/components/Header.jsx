import React from 'react'
import './Header.css'

export default props =>
   <header className='header'>
        <div className="home">
        
          <a href='/'>
               <i class="bi bi-house-door-fill" style={{'fontSize': '2rem', 'color': 'black'}}></i>
               Home
          </a>
          </div>
          <div className='search-input'>
               <input type='text' placeholder='search'/>
          </div>
          <div className='logo'>
               Task Manager System
          </div>
          <div className='icons'>
               <div className='information-icon'>
                    <a href='/notification'>
                         <i class="bi bi-info-circle-fill"></i>  
                    </a>
               </div>

               <div className='notification-icon'>
                    <a href='/notification'>
                         <i class="bi bi-bell-fill"></i>     
                    </a>
               </div>

               <div className='account-icon'>
                    <a href='/account'>
                         <i class="bi bi-person-fill"></i>    
                    </a>
                </div>
          </div>
</header>
