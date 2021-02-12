import React from 'react'
import './TaskRow.css'

export default props => 
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
 