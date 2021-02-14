import React, { useState } from 'react'
import './Sticky.css'
import AddNewTask from './modalforms/AddNewTask' 
import Modal from 'react-modal'


function getTaskElements(elements, leftArrow, rightArrow){
    let result = []
    for (let element in elements){
        result.push(
            <div className='icon-container'>
                <div className='taskDescription'>
                    {elements[element]}
                </div>
                
                <div className='leftArrow'>
                    <i className={leftArrow}></i>
                </div>
            
                <div className='rightArrow'>
                    <i className={rightArrow}></i>
                </div>

                <div className='deleteItem'>
                    <i className='bi bi-trash'></i>
                </div>
        </div>
        )
    }
    return result
}

function Sticky(props){
    const [showModalForm, setShowModalForm] = useState(false)

    return (
        <div className='sticky-notes'>
            <div className='items'>
                <div className='note-header'>
                    <div className='note-header-title'>
                        {props.header}
                    </div>
                    <div className='note-header-icon'>
                        <a href='#'>
                            <i className="bi bi-plus-square"/>
                        </a>
                    </div>        
                </div>
                <div className='content'>
                {getTaskElements(props.content,
                                props.leftArrow,
                                props.rigthArrow)}
                </div>
            </div>
        </div>
    )
}
export default Sticky
   