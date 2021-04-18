import './AddNewTask.css'
import React from 'react'

function AddNewTaskForm(){
    
        return (
                <div className = 'modal-container-new-task'>
                    <div className = 'modal-header-new-task'>
                        <h1 className='modal-h1-new-task' 
                            style={{'color':'black'}}>
                                Registration of new Task
                        </h1>         
                    </div>
                    <div className='modal-body-new-task'>
                        <form className='task-input-form'>
                            <div className='input-row'>
                                <div className='text-input'>
                                    <label>Subject</label>
                                    <input className='input-form' 
                                    />
                                </div>
                            </div>

                            <div className='input-row'>
                                <div className='text-input'>
                                    <label>Start Date</label>
                                    <input type='text' className='input-form'
                                    />
                                </div>
                            </div>

                            <div className='input-row'>
                                <div className='text-input'>
                                    <label>Due date</label>
                                    <input type='text' className='input-form'
                                    />
                                </div>
                            </div>

                            <div className='input-row'>
                                <div className='text-input'>
                                    <label>Description</label>
                                    <input type='text' className='input-form'
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        )
}

export default AddNewTaskForm