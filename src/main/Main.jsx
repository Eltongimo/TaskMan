import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Board from '../components/Board'
import Menu from '../components/Menu'
import './Main.css'

import {BrowserRouter as Router} from 'react-router-dom'

export default props =>
    <div className='main'>
        <Header/>
        <div className='main-content'>
            <Menu/>
            <Board/>
        </div>
        <Footer/>
    </div>