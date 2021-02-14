import './AddNewTask.css'
import React, {Component} from 'react'
import Modal from 'react-modal'
class AddNewTaskForm extends Component{
    
    render(){
        return (
                <div className = 'modal-container-new-task'>
                    <div className = 'modal-header-new-task'>
                        <h1 className='modal-h1-new-task' style={{'color':'black'}}>Registration of new Task</h1>         
                    </div>
                    <div className='modal-body-new-task'>
                        <form>
                            <input placeholder='Insert The Task Name'/>
                            <input type='text' placeholder='Insert Status'/>
                            <input type='date' placeholder='click to insert Date'/>
                        </form>
                    </div>
                </div>
        )
    }
}

export default AddNewTaskForm
