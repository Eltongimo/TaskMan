import React from 'react'
import './Menu.css'

export default props =>
    <nav >
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/myboard">Board</a></li>
            <li><a href="/mycards">Cards</a></li>
            <li><a href="/mytasks">Tasks</a></li>
        </ul>
    </nav>
