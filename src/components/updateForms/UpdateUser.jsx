import {useEffect, useState} from 'react'
import React from 'react'
import {v4 as uuidv4} from 'uuid';
import {ref,set,get} from 'firebase/database'
import {db} from '../database/DatabaseHelper'
import { child, update } from 'firebase/database';

function UpdateUser(){

    const [user, setUser] = useState({
        Role: '',
        Username: '',
        Password: '',
        Area: '',
        Project: ''
    })

    const userKey = document.URL.split('=')[1]
    const [lats, setLats] = useState()
    const [projects, setProjects] = useState()

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
        get(child(ref(db), `User/${userKey}`)).then( s => {
            if (s.exists()){
                setUser(s.val())
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
            Area: user.Area,
            Project: user.Project
        })
    }

    function setPassword(e){
        setUser({
            Password: e.target.value,
            Username: user.Username, 
            Role: user.Role,
            Area: user.Area,
            Project: user.Project
        })
    }

    function setRole(e){
        setUser({
            Username: user.Username,
            Password: user.Password, 
            Role: e.target.value,
            Area: user.Area,
            Project: user.Project
        })
    }

    function setArea(e){
        setUser({
                Username: user.Username,
                Password: user.Password, 
                Role: user.Role,
                Area: e.target.value,
                Project: user.Project
            })
     }

     function setProject(e){
        setUser({
            Username: user.Username,
            Password: user.Password, 
            Role: user.Role,
            Area: user.Area,
            Project: e.target.value
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
      
        update(ref(db, `User/${userKey}`), user).then(()=>
        {
            alert('Actividade actualizada com Sucesso')
        }).catch(() => {
            alert('Erro ao eliminar o Usuario, Tenta mais tarde')
        })
    
        document.getElementById('closemodal').click()
        window.history.back()
    }

    function createRole(){
    
        let a = []

        if (user.Role.toLowerCase() === 'operacional'){
            a.push( <option  value="Operacional" defaultChecked>Operacional</option>)
            a.push(<option value="Tatico">Tatico</option>)
        }else{
            a.push(<option value="Tatico" defaultChecked>Tatico</option>)
            a.push(<option  value="Operacional" >Operacional</option>)
        }
        return a
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
          <input type="text" onChange={setPassword} value={user.Password} className="form-control" aria-describedby="emailHelp" />
      </div>

      <div className="form-group">
          <label for="exampleInputEmail1">Tipo de Usuario</label>
          <select className="form-select" value={user.Role} onChange={setRole} aria-label="Default select example">
                  {createRole()}
          </select>
      </div>
  
      <div className="form-group">
          <label for="exampleInputEmail1">Area</label>
          <select className="form-select"  value={user.Area} onChange={setArea} aria-label="Default select example">
                {generateArea()}
           </select>

           <div className="form-group">
          <label for="exampleInputEmail1">Projecto</label>
          <select className="form-select"  value={user.Project} onChange={setProject} aria-label="Default select example">
                {generateProject()}
          </select>
      </div>

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