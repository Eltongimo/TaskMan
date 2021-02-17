import React from 'react'
import './TaskRow.css'

function TaskRow(props){
    return (
        <div className='rows-report'>
            <div className='colmns-report'>
                <ul >
                    <li>
                        {props.name}
                    </li>
                    <li>
                        {props.status}
                    </li>
                    <li>
                        {props.startDate}
                    </li>
                    <li>
                        {props.endDate}
                    </li>
                    <li>
                        {props.performance}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TaskRow