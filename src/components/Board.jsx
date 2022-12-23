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
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Home from './Home'
import NewsLetter from './projectviews/NewsLetter'
import Carousel from './projectviews/Carousel'
import AddProjectForm from './forms/AddProject'
import AddProducts from './forms/AddProducts'


function Board() {
    const history = useHistory()

    function add(e){


        var linkToAdd = document.URL.split('/')[3]

        if (linkToAdd === 'projects'){
            history.push({
                pathname: '/addproject',
            })
        }else if (document.URL.split('/')[3].split('?')[0] === 'products'){
            history.push({
                pathname: '/addproducts',
                search: `?key=${document.URL.split('/')[3].split('=')[1]}`,
            })
        }
    }

    function back(){
        window.history.back()
    }

    return (
        <section className='container'>
            <div className='title' id='title'>
                <i class="bi bi-arrow-left" style={{cursor: 'pointer',
                                                    marginRight: '20px'
            }} onClick={back}/>
                <input type='tex' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                <button type="button" class="btn btn-light" onClick={add}>Adicionar</button>
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

                    <Route path='/addproject' exact>
                        <AddProjectForm/>
                    </Route>  

                    <Route path='/dashboard' exact>
                        <Dashboard/>
                    </Route>  

                    <Route path='/newsletter' exact>
                        <NewsLetter/>
                    </Route>
                    
                    <Route path='/relatorios' exact>
                        Relatorios
                    </Route>

                    <Route path='/usuarios' exact>
                        Usuarios
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
        