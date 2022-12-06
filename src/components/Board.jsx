import './Board.css'
import  Sticky from './Sticky'
import Report from './Report'
import React from 'react'
import Projects from  './projectviews/Projects'
import Charts from './Charts'

import {Switch, Route} from 'react-router-dom'

function content(){
    return ([<p>task1</p>, <p>task2</p>,<p>task3</p>,])
}

function Board() {
    return (
        <section className='container'>
            <div className='board'>
                <Switch>
                    <Route path='/report' exact>
                        <Report/>
                    </Route>
                    <Route path='/projects' exact>
                        <Projects/>
                    </Route>                        
                    <Route path='' exact>
                        <Charts />
                    </Route>                        
                </Switch>
            </div>
        </section>

    )
}

export default Board
        