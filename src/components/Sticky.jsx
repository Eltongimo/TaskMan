import React from 'react'
import './Sticky.css'

/*This elements mus come from Backend in very short future*/

function getElementsForStickyNotes(){

}

export default props =>
   <div className='sticky-notes'>
        <div className='items'>
            <div className='header'>
                {props.header}      
                <a href="#">
                    <i class="bi bi-plus-square"></i>
                </a>        
            </div>
            <div className='content'>
              
                <div className='icon-container'>
                    
                    <div className='leftArrow'>
                        <i className={props.leftArrow}></i>
                    </div>
                    <div className='rightArrow'>
                        <i class={props.rightArrow}></i>
                    </div>

                    <div className='deleteItem'>
                        <i class={props.deleteItem}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
