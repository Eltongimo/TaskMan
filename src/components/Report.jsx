import './Report.css'
import React from 'react'
/*
    O header pode ser melhorado ...
*/
export default props =>
    <div className='table-container'>
        <div className='header-container'>
            <div className='header'>Task</div>
            <div className='header'>Status</div>
            <div className='header'>Start Date</div>
            <div className='header'>End Date</div>
            <div className='header'>Performance</div>
        </div>
        
        <div className='rows-container'>

        </div>
    </div>