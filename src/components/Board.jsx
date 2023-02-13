import './Board.css'
import React from 'react'
import Home from './Home'
import Projects from  './projectviews/Projects'
import {Switch, Route} from 'react-router-dom'
import Product from './projectviews/Products'
import MacroActivity from './projectviews/MacroActivities'
import './Report.css'

import Activities from './projectviews/Activities'

import Dashboard from './Dashboard'
import Lat from './projectviews/LAT'
import NewsLetter from './projectviews/NewsLetter'
import Carousel from './projectviews/Carousel'
import AddProjectForm from './forms/AddProject'
import AddMacroActivities from './forms/AddMacroActivities'
import AddActivity from './forms/AddActivitiy'
import AddNewsLetter from './forms/AddNewsLetter'
import Users from './projectviews/Users'
import AddUser from './forms/AddUser'
import Reports from './projectviews/Reports'
import ReadNewsNetter from './projectviews/ReadNewsLetter'
import ShowDashboard from './ShowDashboard'
import UpdateProduct from './updateForms/UpdateProducts'
import UpdateProject from './updateForms/UpdateProject'
import EditHomeContent from './projectviews/EditHomeContent'
import AddProducts from './forms/AddProducts'
import UpdateMacroActivity from './updateForms/UpdateMacroActivity'
import UpdateActivity from './updateForms/UpdateActivity'
import NewsLetterHome from './Newsletter/NewsletterHome'
import UpdateNewsletter from './updateForms/UpdateNewsletter'
import UpdateUser from './updateForms/UpdateUser'

function Board() {

    return (
        <section className='container'>
            <div className='board'>
                <Switch>
                    <Route path='/updateuser'><UpdateUser/></Route>
                    <Route path='/updatenewsletter'><UpdateNewsletter/></Route>
                    <Route path='/newsletterhome' exact> <NewsLetterHome/> </Route>
                    <Route path='/updateactivity' exact><UpdateActivity/></Route>
                    <Route path='/updatemacroactivity' exact> <UpdateMacroActivity/> </Route>
                    <Route path='/projects' exact> <Projects/> </Route>   
                    <Route path='/products' exact> <Product/> </Route>
                    <Route path='/updateproduct' exact> <UpdateProduct/> </Route>
                    <Route path='/macroactivities' exact > <MacroActivity/> </Route>
                    <Route path='/activities' exact><Activities/></Route>
                    <Route path='/updateproject' exact><UpdateProject/> </Route>
                    <Route path='/dashboard' exact> <Dashboard/> </Route>          
                    <Route path='/edithomecontent' exact> <EditHomeContent/> </Route>
                    <Route path='/addproducts' exact> <AddProducts /></Route>
                    <Route path='/showdashboard' exact> <ShowDashboard/></Route>
                    <Route path='/adduser' exact> <AddUser/> </Route>
                    <Route path='/readnewsletter' exact><ReadNewsNetter /></Route>
                    <Route path='/products' exact>  <Product/></Route>
                    <Route path='/addactivities' exact> <AddActivity/> </Route>
                    <Route path='/lats' exact> <Lat/> </Route>  
                    <Route path='/addproject' exact><AddProjectForm/> </Route>  
                    <Route path='/addmacroactivities' exact><AddMacroActivities/> </Route>
                    <Route path='/newsletter' exact><NewsLetter/> </Route>
                    <Route path='/addnewsletter' exact><AddNewsLetter/></Route>
                    <Route path='/relatorios' exact><Reports/></Route>
                    <Route path='/usuarios' exact><Users/></Route>
                    <Route path='/carousel' exact><Carousel/></Route>
                    <Route path='' exact> <Home /> </Route>  
                </Switch>
            </div>
        </section>
    )
}

export default Board
        