import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Board from '../components/Board'
import Sticky from '../components/Sticky'
import Menu from '../components/Menu'
import './Main.css'

export default props =>
    <div className='main'>
        <Header></Header>
        <div className='main-content'>
            <Menu></Menu>
            <Board>
            </Board>
        </div>
        <Footer></Footer>
    </div>