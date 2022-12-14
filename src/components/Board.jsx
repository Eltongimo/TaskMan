import './Board.css'
import React from 'react'
import Projects from  './projectviews/Projects'
import Charts from './Charts'
import {Switch, Route} from 'react-router-dom'
import Product from './projectviews/Products'
import MacroActivity from './projectviews/MacroActivities'
import Activities from './projectviews/Activities'
import './Report.css'
import './projectviews/Products'

function Board() {
    return (
        <section className='container'>
            <div className='board'>
                <Switch>
                    <Route path='/projects' exact>
                        <Projects/>
                    </Route>     
                    
                    <Route path='/products'>
                        <Product/>
                    </Route>

                    <Route path='/macroactivities' >
                        <MacroActivity/>
                    </Route>
                    
                    <Route path='/activities' exact>
                        <Activities/>
                    </Route>

                    <Route path='/products' exact>
                        <Product/>
                    </Route>
                    
                    <Route path='' exact>
                        Home
                    </Route>                        
                </Switch>
            </div>
        </section>
    )
}

export default Board
        