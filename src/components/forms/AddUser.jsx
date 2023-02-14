import {useState} from 'react'
import React from 'react'
import {v4 as uuidv4} from 'uuid';
import {ref,set,get,child} from 'firebase/database'
import {db} from '../database/DatabaseHelper'

function back(e){
    window.history.back()
}

function AddUser(){

    const [user, setUser] = useState({
        Role: 'Operacional',
        Username: '',
        Password: '',
        Area: 'Urbanização e Regeneração Urbana',
        ProjectKey: null,
        LATKey: null
    })
    const [projects, setProjects] = useState([])
    const [lats, setLats] = useState()
    
    const dbRef = ref(db)

    function getProject(){

        get(child(dbRef, 'Project')).then(snapshot => {

            if (snapshot.exists()){
                setProjects(snapshot.val())
            }
        })
    }

    function getLAT(){
        get(child(dbRef, 'LAT')).then(snapshot => {

            if (snapshot.exists()){
                setLats(snapshot.val())
            }
        })
    }

    function setUsername(e){

        setUser({
            Username: e.target.value,
            Password: user.Password,
            Role: user.Role,
            Area: user.Area
        })
    }

    function setPassword(e){
        setUser({
            Password: e.target.value,
            Username: user.Username, 
            Role: user.Role,
            Area: user.Area
        })
    }

    function setRole(e){
        setUser({
            Username: user.Username,
            Password: user.Password, 
            Role: e.target.value,
            Area: user.Area
        })
    }



    function setArea(e){
        setUser({
                Username: user.Username,
                Password: user.Password, 
                Role: user.Role,
                Area: e.target.value
            })
     }
    function addUser(e){
        console.log(user)
        set(ref(db, 'User/' + uuidv4()), user).then(() => {
            alert('Usuario gravado com sucesso')
        }).catch(() => {
            alert('Erro ao gravar usuario')
        })
        document.getElementById('closemodal').click()
        window.history.back()
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
              Adicionar Usuario
          </div>
      </div>
      <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" onChange={setUsername} className="form-control" aria-describedby="emailHelp" />
      </div>
      
      <div className="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input type="text" onChange={setPassword} className="form-control" aria-describedby="emailHelp" />
      </div>

      <div className="form-group">
          <label for="exampleInputEmail1">Tipo de Usuario</label>
          <select className="form-select"  onChange={setRole} aria-label="Default select example">
              <option selected value="Urbanização e Regeneração Urbana" defaultChecked>Operacional</option>
              <option value="Recursos Hídricos e Resiliência">Tatico</option>
          </select>
      </div>
  
      
      <div className="form-group">
          <label for="exampleInputEmail1">Area</label>
          <select className="form-select"  onChange={setArea} aria-label="Default select example">
              <option selected value="Urbanização e Regeneração Urbana" defaultChecked>Urbanização e Regeneração Urbana</option>
              <option value="Recursos Hídricos e Resiliência">Recursos Hídricos e Resiliência</option>
              <option value="Ambiente e Resíduos Sólidos">Ambiente e Resíduos Sólidos</option>
              <option value="Educação Primária e Pré-Escolar">Educação Primária e Pré-Escolar</option>
              <option value="Sustentabilidade">Sustentabilidade</option>
           </select>
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
                  <label for="exampleInputEmail1">Submeter  Usuario ?</label>
              </div>
          </form>
              </div>
                  <div className="modal-footer">
                      <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Não</button>
                      <button type="button" onClick={addUser} className="btn btn-primary">Sim</button>
                  </div>
              </div>
          </div>
      </div>    
  </div>
    )
}

export default AddUser