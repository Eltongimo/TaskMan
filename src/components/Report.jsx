import './Report.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TaskRow from './TaskRow'

const baseUrl = 'http://localhost:3001/tasks'


function GetData(){
    const [rows, setRows] = useState([])

    useEffect(() => axios.get(baseUrl)
                    .then( (response) => setRows(response.data))
    ,[])

    return (
                rows.map((item,index) => <TaskRow name={item.name}
                                 startDate = {item.startDate} 
                                 endDate = {item.endDate}
                                 status = {item.status}
                                 performance = {item.performance} 
                                 key={index}
                            />
                )
            )
}

function Report() {  
    return (
        <div className='table-container'>
            <div className='header-container'>
                <div className='report-header'>Task</div>
                <div className='report-header'>Status</div>
                <div className='report-header'>Start Date</div>
                <div className='report-header'>End Date</div>
                <div className='report-header'>Performance</div>
            </div>
            
            <div className='rows-container'>
                {GetData()}
            </div>
        </div>
)}

export default Report