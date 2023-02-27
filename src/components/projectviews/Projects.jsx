import React, { useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, getDatabase, ref, remove } from "firebase/database"
import './Projects.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { useState } from 'react'

function Projects (){
    
    const [projects, setProjects]  = useState({projs: []})
    const history = useHistory()
    const dbRef = ref(db)
    const userRole = document.getElementById('role').value
    const userProjects = document.getElementById('userprojects').innerHTML
    const [user, setUser] = useState({})

    function getUser(username){

        get(child(dbRef, 'User')).then(snapshot => {
            if (snapshot.exists()){
                for (let key in snapshot.val()){
                    if (snapshot.val()[key].Username === username){
                        setUser(snapshot.val()[key])
                        break
                    }
                }
            }
        })
        return user
    }

    function getProject(){

        const u = document.getElementById('welcome').innerHTML.split(',')[0]
        getUser(u)

        console.log(user)

        get(child(dbRef, `Project`)).then((snapshot) => {
            let a = {}
            if (snapshot.exists())
            {
                for (let key in snapshot.val()){
                   if (userRole !== 'operacional' ){
                        for (let uKey in user.Project){
                            if (snapshot.val()[key].ProjectName === user.Project[uKey].Project){
                                a[key] = snapshot.val()[key]
                            }    
                        }
                    } else if (userRole === 'operacional'){
                        a[key] = snapshot.val()[key]
                    }
                }
                setProjects(a)
            }
            else
                alert('no data to load from db server')
        })
    }

    function updateProject(e){
        let productKey = e.target.id
        
        if (document.getElementById('role').value !== 'operacional'){
            alert('Não tens permição para Actualzizar dados do Projecto')
            return 
        }
        history.push({
            pathname: '/updateproject',
            search: `?key=${productKey}`,
            })
    }


    function handleButtonEvent(e){
       
         const userProject = document.getElementById('userprojects').innerHTML
         
         const clickedProject = document.getElementById(e.target.id).innerHTML

         if (document.getElementById('role').value === 'operacional' || userProject.toLowerCase() === clickedProject.toLowerCase()){
            history.push({
                pathname: '/products',
                search: `?key=${e.target.id}`,
              })
         }else {
            alert(`Não pode ver as informaçoes deste projecto, porque não foi cadastrado para o ${clickedProject}`)
            return 
        }
  
     }

     function searchProject(e){
        
        if (e.target.value === ''){
            getProject()
        }
        else{
          
            let array = []
            for( let key in projects){
                array.push(projects[key])
            }

            const a = array.filter(element => element.ProjectName.toLowerCase().includes(e.target.value.toLowerCase()))
            const b = {}
            for (let key2 in a){
                for (let key3 in projects ){
                    if ( a[key2].ProjectName === projects[key3].ProjectName){
                       b[key3] = a[key2]
                       break 
                    }
                }
            }
            setProjects(b)
        }
     }

     function deleteProject(e){

        document.getElementById(`closemodal${e.target.id}`).click()
        
        if (document.getElementById('role').value !== 'operacional'){
            alert('Não tens permissão para apagar projectos')
            return 
        }

        remove(ref(db, `Project/${e.target.value}`)).then(() => {
            const dbRef = ref(db)
            get(child(dbRef, `Project`)).then((snapshot) => {
                if (snapshot.exists())
                    setProjects({projs: snapshot.val()})
        
            })
            alert('Projecto eliminado com sucesso')
        
        }).catch(() => {
            alert('Erro ao eliminar o projecto')
        })
    }
 
    useEffect( () => {
        getProject()    
    },[])

    function buildTable(){
        var values = []
        let count = 0
        if (projects !== null ){
            for(let key in projects){
               values.push(
                <button id={key}
                    style={{background: 'transparent',
                            border: 'none',
                            width: '100%',
                            outline: 'none',
                        }}
                >
                    <div className='rows-report' id={`${count++}.${projects[key].Key}`}>
                        <div className='colmns-report'id={`${count++}.${projects[key].Key}`} >
                            <ul id={`${count++}.${projects[key].Key}`}>
                                <li id={`${count++}.${key}`}>
                                    {values.length + 1}
                                </li>
                                <li id={`${projects[key].Key}`} key={`${projects[key].ProjectName}`} onClick={handleButtonEvent}>
                                    {projects[key].ProjectName}
                                </li>
                                <li id={`${count++}.${projects[key].Key}`}>
                                    {projects[key].TypeOfActivity}
                                </li>
                                <li className='project-icons'>
                                    <i className="bi bi-pencil" id={`${key}`} onClick={updateProject}/>
                                </li>
                                <li className='project-icons' id={`${count++}.${projects[key].Key}`}>
                                    <i className="bi bi-trash" id={`delete.${count}.${projects[key].Key}`} data-toggle="modal" data-target={`#exampleModal${count}`} 
                                    />    
                                </li>
                            </ul>
                        </div>

                        <div className="modal fade" id={`exampleModal${count}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                            <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Confirmação</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                <form>
                                    <div className="form-group" >
                                        <label style={{textAlign: 'left'}} for="exampleInputEmail1">Apagar Projecto ?</label>
                                    </div>
                                </form>
                                    </div>
                                        <div className="modal-footer">
                                            <button type="button" id={`closemodal${count}`} className="btn btn-secondary" data-dismiss="modal">Não</button>
                                            <button type="button" value={key} id={count} onClick={deleteProject} className="btn btn-primary">Sim</button>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                </button>
               )    
            }
        }

        function add(e){
            history.push({
                pathname: '/addproject',
            })
        }
        
        return( 
        <div >
            <div className='title' id='title'>
                <input type='tex' onChange={searchProject} className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                <button type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
            <div className='header-container'>
                <div className='report-header'>Nr</div>
                <div className='report-header'>Nome do Projecto</div>
                <div className='report-header'>Tipo de Actividade</div>
                <div className='report-header'>Actualizar</div>
                <div className='report-header'>Apagar</div>
            </div>
                {values}
            </div>
        )
    }
    return buildTable()
}

export default Projects
