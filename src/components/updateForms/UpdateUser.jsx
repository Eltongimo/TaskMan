import {useEffect, useState} from 'react'
import React from 'react'
import {v4 as uuidv4} from 'uuid';
import {ref,set,get} from 'firebase/database'
import {db} from '../database/DatabaseHelper'
import { child, remove } from 'firebase/database';

function UpdateUser(){

    const [user, setUser] = useState({
        Role: '',
        Username: '',
        Password: '',
        Area: '',
        Project: '',
        Id: ''
    })

    const userKey = document.URL.split('=')[1]
    const [lats, setLats] = useState()
    const [projects, setProjects] = useState()
    const [userProjects, setUserProjects ] = useState([
        {Project:  ''},
    ])
    const [userLats, setUserLats] = useState([
        {Area: ''}
    ])

    function getLATs(){
        get(child(ref(db), `LAT`)).then( snapshot => {
            if (snapshot.exists()){
                setLats(snapshot.val())
            }
        })
    }

    function getProjects(){
        
        get(child(ref(db), `Project`)).then( snapshot => {
            if (snapshot.exists()){
                setProjects(snapshot.val())
            }
        })
    }

    function back(e){
        window.history.back()
    }

    function getUser(){
        get(child(ref(db), `User`)).then( snapshot => {
            if (snapshot.exists()){
                for (let key in snapshot.val()){
                    if(snapshot.val()[key].Id === userKey){
                        setUser(snapshot.val()[key])
                    
                        const project = typeof snapshot.val()[key].Project
                        const area = typeof snapshot.val()[key].Area
                        console.log(project)
                        console.log(area)

                        if (area === 'object'){
                            setUserLats(snapshot.val()[key].Area)
                        }
                        if (project === 'object'){
                            setUserProjects(snapshot.val()[key].Project)
                        }
                        break
                    }
                }
            }
        })
    }
    useEffect(() => {
        getLATs()
        getUser()
        getProjects()
    }, [])

    function setUsername(e){

        setUser({
            Username: e.target.value,
            Password: user.Password,
            Role: user.Role,
            Area: userLats,
            Project: userProjects,
            Id: user.Id

        })
    }

    function setPassword(e){
        setUser({
            Password: e.target.value,
            Username: user.Username, 
            Role: user.Role,
            Area: userLats,
            Project: userProjects,
            Id: user.Id
        })
    }

    function setRole(e){
        setUser({
            Username: user.Username,
            Password: user.Password, 
            Role: e.target.value,
            Area: userLats,
            Project: userProjects,
            Id: user.Id
        })
    }

     function generateArea(){

        let a = []

        a.push(
            <option value="">Selecione uma Area</option>
        )
        for (let key in lats){
            a.push(
                <option value={lats[key].Description}>{lats[key].Description}</option>
            )
        }
        return a
    }



    function updateUser(e){
        
        setUser({
            Username: user.Username,
            Password: user.Password, 
            Role: user.Role,
            Area: userLats,
            Project: userProjects,
            Id: user.Id
        })
        
        user.Area = userLats
        user.Project = userProjects

        console.log(userKey)
        remove(ref(db, `User/${userKey}`)).then(() => {
            set(ref(db, 'User/' + uuidv4()), user).then(()=>
            {
                alert('Usuario Actualizado com sucesso')
            }
        )})
     
        console.log(user)
        document.getElementById('closemodal').click()
        window.history.back()
    }

    function generateProject(){
        
        let a = []
        
        a.push(
            <option value="">Selecione um Projecto</option>
        )
        for (let key in projects){
            a.push(
                <option value={projects[key].ProjectName}> {projects[key].ProjectName}</option>
            )
        }
        return a
    }

    
    function addArea(e){
        let element =  {Area: '', LATKey: ''}
        setUserLats([...userLats,element])
    }

    function addProject(){
        let element = {Project: ''}
        setUserProjects([...userProjects, element])
    }

    function removeLatsField(e){
        let data = [...userLats]
        const index = e.target.id

        data.splice(index,1)

        setUserLats(data)
    }

    function removeProjectField(e){
        let data = [...userProjects]
        const index = e.target.id

        data.splice(index,1)

        setUserProjects(data)
    }

    function handleLatsFormsChange(e,index){
        const data = [...userLats]
   
         data[index][e.target.name] = e.target.value

        setUserLats(data)
    }

    function handleProjectFormsChange(e,index){
        const data = [...userProjects]
   
         data[index][e.target.name] = e.target.value

        setUserProjects(data)
    }
    
    return (
        
        <div className='form-container'>
        <div className='title'> 
          <div className='back-icon'>
              <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                              marginRight: '20px'
                  }} onClick={back}/>
          </div>
          <div className='form-title'>
              Actualizar Usuario
          </div>
      </div>
      <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" value={user.Username} onChange={setUsername} className="form-control" aria-describedby="emailHelp" />
      </div>
      
      <div className="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input type="text" value={user.Password} onChange={setPassword} className="form-control" aria-describedby="emailHelp" />
      </div>

      <div className="form-group">
          <label for="exampleInputEmail1">Tipo de Usuario</label>
          <select className="form-select" value={user.Role} onChange={setRole} aria-label="Default select example">
              <option value="Tatico">Tatico</option>
              <option value="Operacional" >Operacional</option>
          </select>
      </div>
  
      <button type='button' className='btn btn-secondary' onClick={addArea}>Adicionar Area </button>
      <div className="form-group" style={{border: 'solid #ccc 0.1px', marginTop: '5px'}}>
          <label for="exampleInputEmail1">Area</label>
          {userLats.map( (element,index) => {
          
          return(  <div>
                          <button type="button" id={index} onClick={removeLatsField} style={{width: '10%', marginBottom: '15px', marginLeft: '90%'}}className="btn btn-outline-secondary">
                                        Apagar 
                            </button>
                            
                         <select value={element.Area} className="form-select"  name='Area'onChange={event => handleLatsFormsChange(event, index)} aria-label="Default select example"
                            style={{marginBottom: '10px'}}
                        >
                    {generateArea()}
                </select>
                </div>
              )
          })}
      </div>

      <button type='button' className='btn btn-secondary' onClick={addProject}>Adicionar Projecto </button>

      <div className="form-group">
          <label for="exampleInputEmail1">Projecto</label>
          {userProjects.map((element, index) => {
            return (
                <div>
                    <button type="button" id={index} onClick={removeProjectField} style={{width: '10%', marginTop: '15px', marginLeft: '90%'}}className="btn btn-outline-secondary">
                            Apagar 
                    </button>

                         <select value={element.Project} className="form-select"  name='Project'onChange={event => handleProjectFormsChange(event, index)} aria-label="Default select example"
                            style={{marginBottom: '10px'}}
                        >
                            {generateProject()}
                    </select>
                </div>
            )
          })}
         </div>

      <button type="button"  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Gravar Usuario   </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <div className="form-group">
                  <label for="exampleInputEmail1">Actualizar  Usuario ?</label>
              </div>
          </form>
              </div>
                  <div className="modal-footer">
                      <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Não</button>
                      <button type="button" onClick={updateUser} className="btn btn-primary">Sim</button>
                  </div>
              </div>
          </div>
      </div>    
  </div>
    )
}

export default UpdateUser