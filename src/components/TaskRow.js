import React from 'react'
import './TaskRow.css'
 
function TaskRow(props){
   
    let a = []

    if (props.type !== 'msc'){
        a.push(
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
    }else{
        
    a.push(<div className='rows-report'>
            <div className='colmns-report'>
                <ul >
                    <li>
                        {props.ProjectName}
                    </li>
                </ul>
            </div>
        </div>)
    }
    return a
}

export default TaskRow