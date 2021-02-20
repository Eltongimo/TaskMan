import React, { useState } from 'react'
import './Sticky.css'
import Modal from 'react-modal'
import AddNewTaskForm from './modalforms/AddNewTask'

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

const modalStyle = {
    width: '10%'
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
                        <button className='call-modal-button' onClick={() => setShowModalForm(true)}
                            style={{'border':'none', 'background-color':'white'}}
                        >
                            <i className="bi bi-plus-square"/>
                       </button>

                       <Modal  isOpen={showModalForm} 
                              onRequestClose={() => setShowModalForm(false)}
                              style={
                                    {
                                        overlay:{
                                            backgroundColor: 'rgb(204, 204, 204,0.9)'
                                        },
                                        content:{
                                            height: '400px',
                                            left: '50%',
                                            top: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                        }
                                    } 
                            }
                        >
                            <AddNewTaskForm/>
                            <div className='modal-form-footer'>
                                <div className='footer-btn'>
                                    <button className='btn-submit-modal' onClick= {() => setShowModalForm(false)}>Submit</button>
                                </div>
                                <div className='footer-btn'>
                                   <button className='btn-close-modal' onClick= {() => setShowModalForm(false)}>close</button>
                                </div>
                            </div>
                        </Modal>

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
   