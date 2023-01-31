import './Board.css'
import React from 'react'
import Projects from  './projectviews/Projects'
import {Switch, Route} from 'react-router-dom'
import Product from './projectviews/Products'
import MacroActivity from './projectviews/MacroActivities'
import Activities from './projectviews/Activities'
import './Report.css'
import './projectviews/Products'
import Dashboard from './Dashboard'
import Lat from './projectviews/LAT'
import Home from './Home'
import NewsLetter from './projectviews/NewsLetter'
import Carousel from './projectviews/Carousel'
import AddProjectForm from './forms/AddProject'
import AddProducts from './forms/AddProducts'
import AddMacroActivities from './forms/AddMacroActivities'
import AddActivity from './forms/AddActivitiy'
import AddNewsLetter from './forms/AddNewsLetter'
import Users from './projectviews/Users'
import AddUser from './forms/AddUser'
import Reports from './projectviews/Reports'
import ReadNewsNetter from './projectviews/ReadNewsLetter'
import ShowDashboard from './ShowDashboard'
import EditHomeContent from './projectviews/EditHomeContent'

function Board() {

    return (
        <section className='container'>
            <div className='board'>
                <Switch>
                    <Route path='/projects' exact>
                        <Projects/>
                    </Route>     

                    <Route path='/edithomecontent'>
                        <EditHomeContent/>
                    </Route>
                    
                    <Route path='/showdashboard' exact>
                        <ShowDashboard/>
                    </Route>
                    <Route path='/adduser' exact>
                        <AddUser/>
                    </Route>
                    <Route path='/products'>
                        <Product/>
                    </Route>

                    <Route path='/readnewsletter' exact>
                        <ReadNewsNetter />
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

                    <Route path='/addactivities' exact>
                        <AddActivity/>
                    </Route>

                    <Route path='/lats' exact>
                        <Lat/>    
                    </Route>  

                    <Route path='/addproject' exact>
                        <AddProjectForm/>
                    </Route>  

                    <Route path='/dashboard' exact>
                        <Dashboard/>
                    </Route>  

                    <Route path='/addmacroactivities' exact>
                        <AddMacroActivities/>
                    </Route>

                    <Route path='/newsletter' exact>
                        <NewsLetter/>
                    </Route>
                    
                    <Route path='/addnewsletter' exact>
                        <AddNewsLetter/>
                    </Route>

                    <Route path='/relatorios' exact>
                        <Reports/>
                    </Route>

                    <Route path='/usuarios' exact>
                        <Users/>
                    </Route>

                    <Route path='/carousel' exact>
                        <Carousel/>
                    </Route>

                    <Route path='/addproducts' exact>
                        <AddProducts />
                    </Route>  
                      
                    <Route path='' exact>
                        <Home />
                    </Route>  
                </Switch>
            </div>
        </section>
    )
}

export default Board
        