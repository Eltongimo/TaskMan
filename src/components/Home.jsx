import React from 'react'
import './Home.css'
import {db} from './database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get,ref } from "firebase/database"
import Carousel from './projectviews/Carousel'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Home(){
    const [user, setUser ] = useState({})
    const [projects, setProjects] = useState({})
    const [typedUser, setTypedUser] = useState({})
    const [aboutPomar, setAboutPomar] = useState({})
    const history = useHistory()
    
    function getUsername(e){
        setTypedUser({username: e.target.value, password:typedUser.password})
    }

    function getPassword(e){
        setTypedUser({username: typedUser.username, password: e.target.value})
    }


    function editContent(e){
        history.push({
            pathname: '/edithomecontent',
          })
    }

    useEffect( () => {
        const dbRef = ref(db)
            get(child(dbRef,'HomeContent')).then((snapshot) => {

                if (snapshot.exists())
                 for (let key in snapshot.val()){
                    setAboutPomar({About: snapshot.val()[key].About})        
                 }
                }
            )

            get(child(dbRef, `User`)).then((snapshot) => {
                    if (snapshot.exists())
                        setUser({users: snapshot.val()})
                    else
                        alert('No Users')
            })
            get(child(dbRef, 'Project')).then( snapshot => {
                if (snapshot.exists()){
                    setProjects({p: snapshot.val()})
                }
            })
        }
    ,[])

    function login(e){
        
        for (let u in user.users){

            if ( user.users[u].Username === typedUser.username && user.users[u].Password === typedUser.password){
                console.log(user.users[u].Project)
                e.target.isVisible = false
                document.getElementById('welcome').innerHTML = `${typedUser.username}, Bem vindo  ao POMAR!`
                document.getElementById('closemodal').click()
                document.getElementById('role').value = user.users[u].Role
                document.getElementById('userprojects').innerHTML = user.users[u].Project
                document.getElementById('userarea').innerHTML = user.users[u].Area
                enableMenus(user.users[u])
                clearForm()
                return 
            }
        }    
        
   }

    function enableMenus(u){


        if (u.Role === 'operacional'){
            //document.getElementsByClassName('relatorios')[0].hidden = false
            document.getElementsByClassName('usuarios')[0].hidden = false
            document.getElementsByClassName('lat')[0].hidden = false
            document.getElementsByClassName('newsletter')[0].hidden = false
            document.getElementById('newsletterhome').hidden = true
            document.getElementsByClassName('conteudo')[0].hidden = false
        }
        document.getElementsByClassName('navigation')[0].hidden = false
        document.getElementsByClassName('dashboard')[0].hidden = false
        document.getElementsByClassName('projects')[0].hidden = false
    }

    function clearForm(){
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
    }

    function loadprojects(){
        let a = []
        let count = 0
        for (let key in projects.p){
            a.push(
                <li>
                    <button type="button" data-toggle="modal" data-target={`#exampleModal${count}`} style={{marginBottom: '10px',color: 'white', borderRadius: '10px', height: '3.5rem', border: 'solid 0.1px', background: '#001489'}}> {projects.p[key].ProjectName}     </button>
                      <div className="modal fade" id={`exampleModal${count}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Projecto{projects.p[key].ProjectName}</h5>
                                        <button type="button" id='closebutton' className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                <div className="modal-body">
                                    <strong>Tipo de Actividade</strong>
                                    <p> 
                                        {projects.p[key].TypeOfActivity}
                                    </p>

                                    <strong>Objectivo Geral do Projecto</strong>

                                    <p> 
                                          {projects.p[key].GeneralObjective}
                                    </p>

                                    <strong>Objectivo Especifico</strong>

                                    <p> 
                                          {projects.p[key].SpecificObjective}
                                    </p>
                                
                                    <strong>Resultado Esperado</strong>
                                    <p> 
                                        {projects.p[key].Result}
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )
            count++
        }
        return a
    }

    return (
        
        <div className='homeContainer'>

            <div className='carousel-home'>
                <Carousel/>
            </div>
        
            <div className='image' style={{textAlign: 'justify', padding: '10px', marginTop: '15px'}}> 
                <b>Projectos</b>
                <p/>
                <ul>
                    {loadprojects()} 
                </ul>
            </div>
            <div className='text' style={{textAlign: 'justify', padding: '10px'}}>
                <b>Informação sobre o Pomar</b>
                <p>
                    {aboutPomar.About}
                </p>

            <button type="button" onClick={clearForm} className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
                Login
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button type="button" className="closebutton" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label >Username</label> 
                                <input type="email" id='username' onChange={getUsername} className="form-control" aria-describedby="emailHelp" placeholder="Usermane"/>
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input type="password" id='password' onChange= {getPassword} className="form-control" placeholder="Password"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" onClick={login}>Entrar</button>
                    </div>
                    </div>
                </div>
            </div>    
            </div>
        </div>)
}

export default Home