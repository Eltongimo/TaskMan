import {useState,useEffect} from 'react'
import React from 'react'
import {v4 as uuidv4} from 'uuid';
import {ref,set,get,child} from 'firebase/database'
import {db} from '../database/DatabaseHelper'

function back(e){
    window.history.back()
}

function AddUser(){

    const [user, setUser] = useState({
        Role: 'Tatico',
        Username: '',
        Password: '',
        Area: '',
        Project: null,
        LATKey: null
    })
 
    const [userProjects, setUserProjects ] = useState([
        {Project:  ''},
    ])

    const [userLats, setUserLats] = useState([
        {Area: ''}
    ])

    const [projects, setProjects] = useState()
    const [lats, setLats] = useState()
    
    const dbRef = ref(db)

    function getProjects(){

        get(child(dbRef, 'Project')).then(snapshot => {

            if (snapshot.exists()){
                setProjects(snapshot.val())
            }
        })
    }

    function getLATs(){
        get(child(dbRef, 'LAT')).then(snapshot => {

            if (snapshot.exists()){
                setLats(snapshot.val())
            }
        })
    }

    useEffect(() => {
        getLATs()
        getProjects()
    },[])
    function setUsername(e){

        setUser({
            Username: e.target.value,
            Password: user.Password,
            Role: user.Role,
            Area: userLats,
            Project: userProjects
        })
    }

    function setPassword(e){
        setUser({
            Password: e.target.value,
            Username: user.Username, 
            Role: user.Role,
            Area: userLats,
            Project: userProjects
        })
    }

    function setRole(e){
        setUser({
            Username: user.Username,
            Password: user.Password, 
            Role: e.target.value,
            Area: userLats,
            Project: userProjects
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
   
    function addUser(e){

        setUser({
            Username: user.Username,
            Password: user.Password, 
            Role: user.Role,
            Area: userLats,
            Project: userProjects
        })

        set(ref(db, 'User/' + uuidv4()), user).then(() => {
            alert('Usuario gravado com sucesso')
        }).catch(() => {
            alert('Erro ao gravar usuario')
        })
        document.getElementById('closemodal').click()
        window.history.back()
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
              <option selected value="Operacional" defaultChecked>Operacional</option>
              <option value="Tatico">Tatico</option>
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
                            
                         <select className="form-select"  name='Area'onChange={event => handleLatsFormsChange(event, index)} aria-label="Default select example"
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
                            
                    <select className="form-select" name='Project' onChange={event => handleProjectFormsChange(event,index)} aria-label="Default select example">
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