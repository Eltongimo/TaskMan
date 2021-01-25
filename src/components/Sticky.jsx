import React from 'react'
import './Sticky.css'

export default props =>
   <div className='shadow p-3 mb-5 bg-white rounded sticky-notes'>
        <div className='items'>
            <div className='header'>
                {props.header}      
                <a href="#">
                    <i class="bi bi-plus-square"></i>
                </a>        
            </div>
            <div className='content'>
                {props.content} 
                
                <div className='leftArrow'>
                    <i class={props.leftArrow}></i>
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
