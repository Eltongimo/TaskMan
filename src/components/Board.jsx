import './Board.css'
import  Sticky from './Sticky'
import Report from './Report'
import React from 'react'

import {Switch, Route} from 'react-router-dom'

function content(){
    return ([<p>task1</p>, <p>task2</p>,<p>task3</p>,])
}

function Board() {
    return (
        <section className='container'>
            <div className='board'>
                <div className='title'> 
                    <i className="bi bi-clipboard"></i>
                        My Board
                </div>

                <div className='stiky-notes-container'>
                    <Switch>

                       <Route path='/report' exact>
                            <Report/>
                        </Route>
                        
                        <Route path='' exact>
                            <Sticky header='Items' content={content()}
                                leftArrow=''
                                rigthArrow='bi bi-arrow-bar-right'
                                />

                            <Sticky header = 'Doing' content={content()}
                                    rigthArrow='bi bi-arrow-bar-right'
                                    leftArrow='bi bi-arrow-bar-left'
                                />
                            
                            <Sticky header = 'Done'  content={content()}
                                leftArrow='bi bi-arrow-bar-left'
                                rigthArrow=''
                            />
                        </Route>                        
                    </Switch>
                </div>
            </div>
        </section>

    )
}

export default Board
        