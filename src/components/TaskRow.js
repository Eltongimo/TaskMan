import React from 'react'
import './TaskRow.css'
 
function TaskRow(props){
    return (
        <div className='rows-report'>
            <div className='colmns-report'>
                <ul >
                    <li>
                        {props.LAT}
                    </li>
                    <li>
                        {props.ProjectName}
                    </li>
                    <li>
                        {props.DeadLine}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TaskRow