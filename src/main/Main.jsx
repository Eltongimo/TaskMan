import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Board from '../components/Board'
import Menu from '../components/Menu'
import './Main.css'

function Main() {
    return (
        <div className='main'>
            <Header/>
                <div className='main-content'>
                    <Menu/>
                    <Board/>
                </div>
            <Footer/>
        </div>
    )
}
export default Main
  