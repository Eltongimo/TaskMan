import React from 'react'
import './Home.css'
import {db} from './database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get,ref } from "firebase/database"
import CarouselHome from './projectviews/Carousel'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { google } from 'googleapis-common';


function Home(){
    const [user, setUser ] = useState({})
    const [projects, setProjects] = useState({})
    const [typedUser, setTypedUser] = useState({})
    const [aboutPomar, setAboutPomar] = useState({})
    const history = useHistory()
  
    const [userData, setUserData] = useState()

    const { google } = require('googleapis');
    const fs = require('fs');

    // First, authorize your application with Google Drive API using your client ID and secret
    const auth = new google.auth.GoogleAuth({
        keyFile: './serviceaccount.json',
        scopes: ['https://www.googleapis.com/auth/drive'],
    });


    // create a new instance of the drive API
    const drive = google.drive({
        version: 'v3',
        auth,
    });

    // Define the file metadata and content
    const fileMetadata = {
        name: 'elton.svg',
        parents: ['1UExC1HbHJZ8nVMMPKXnjMMBkvt02aHUB'] // ID of the folder where you want to upload the file
    };

    const file = fs.createReadStream('logo.svg')

    const media = {
    mimeType: 'image/svg',
    body: file,
    };

    // Upload the file to Google Drive
    drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
    }, (err, file) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`File ID: ${file.data.id}`);
    }
    })

    function assignUsername(e){
        const file = e.target.files[0]
        const { google } = require('googleapis');

        // First, authorize your application with Google Drive API using your client ID and secret
        const auth = new google.auth.GoogleAuth({
        keyFile: './serviceaccount.json',
        scopes: ['https://www.googleapis.com/auth/drive'],
        });


        // create a new instance of the drive API
        const drive = google.drive({
            version: 'v3',
            auth,
        });

        // Define the file metadata and content
        const fileMetadata = {
        name: 'elton.svg',
        parents: ['1UExC1HbHJZ8nVMMPKXnjMMBkvt02aHUB'] // ID of the folder where you want to upload the file
        };

        const media = {
            mimeType: 'image/svg',
            body: file,
        };

        // Upload the file to Google Drive
        drive.files.create(
            {
                resource: fileMetadata,
                media: media,
                fields: 'id',
            },
            (err, file) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`File ID: ${file.data.id}`);
                }
            })
    }

    function postData(){

    }
   
    return (
        <div >
            <label id='example'/>
            <input type='file' onChange={assignUsername}/>
            <button className='btn btn-sucess' onClick={postData}>Upload Data</button>
        </div>
    )

    /*
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
                e.target.isVisible = false
                document.getElementById('reload').innerHTML = 'Log out'
                document.getElementById('welcome').innerHTML = `${typedUser.username}, Bem vindo  ao POMAR!`
                document.getElementById('role').value = user.users[u].Role
                document.getElementById('userarea').innerHTML = user.users[u].Area
                writeProjects(user.users[u])
                enableMenus(user.users[u])
                const b = document.getElementById('closemodallogin')
                b.click()
                clearForm()
                return 
            }
        }    
        
   }

   function writeProjects(u){
    
    document.getElementById('role').innerHTML = u.Role
    document.getElementById('userarea').innerHTML = ''
    document.getElementById('userprojects').innerHTML = ''
    
    for (let key in u.Project){
       document.getElementById('userprojects').innerHTML += u.Project[key].Project + ';'
    }

    for (let key in u.Area){
        document.getElementById('userarea').innerHTML += u.Area[key].Area + ';'
    }

   }
    function enableMenus(u){
        if (u.Role === 'operacional'){
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
                <li id={key}>
                    <button type="button" data-toggle="modal" data-target={`#exampleModal1${count}`} style={{marginBottom: '10px',color: 'white', borderRadius: '10px', height: '3.5rem', border: 'solid 0.1px', background: '#001489'}}> {projects.p[key].ProjectName}     </button>
                      <div className="modal fade" id={`exampleModal1${count}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
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
        
        <div className='homeContainer' id='home'>

            <div className='carousel-home'>
                <CarouselHome/>
            </div>
        
            <div className='image' style={{textAlign: 'justify', padding: '10px', marginTop: '15px'}}> 
            </div>
  
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

            <button type="button" onClick={clearForm} className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalogin">
                Login
            </button>

            <div className="modal fade"  id="exampleModalogin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <button type="button" id='closemodallogin' className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" onClick={login}>Entrar</button>
                    </div>
                    </div>
                </div>
            </div>    
            </div>
        </div>)*/
}

export default Home