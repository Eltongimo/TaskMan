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
                    <h1>POMAR</h1>
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
   