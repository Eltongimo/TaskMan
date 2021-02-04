import './Report.css'
import React from 'react'
import axios from 'axios'

/*
    O header pode ser melhorado ...
*/

const baseUrl = "http://localhost:3001/tasks"

function getData(){

    axios.get(baseUrl)
        .then((response) =>{
            console.log(response.data);
        })
}

getData()

export default props =>
    <div className='table-container'>
        <div className='header-container'>
            <div className='report-header'>Task</div>
            <div className='report-header'>Status</div>
            <div className='report-header'>Start Date</div>
            <div className='report-header'>End Date</div>
            <div className='report-header'>Performance</div>
        </div>
        
        <div className='rows-container'>
            <div className='rows-report'>
                <div className='colmns-report'>
                    <ul>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                    </ul>
                </div>
            </div>

            <div className='rows-report'>
                <div className='colmns-report'>
                    <ul>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
           
