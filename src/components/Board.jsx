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
import Home from './Home'
import Lat from './projectviews/LAT'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

function Board() {

    return (
        <section className='container'>
            <div className='title' id='title'>
                <i class="bi bi-arrow-left" style={{cursor: 'pointer'}} />
            </div>
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

                    <Route path='/lats' exact>
                        <Lat/>    
                    </Route>  

                    <Route path='' exact>
                        <Home/>
                    </Route>  
                      
                </Switch>
            </div>
        </section>
    )
}

export default Board
        