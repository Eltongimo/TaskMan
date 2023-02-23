import { useEffect,useState } from "react"
import React from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, getDatabase, ref, remove} from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import './Users.css'

function Users(){

    const [users, setUsers]  = useState()
    const history = useHistory()
    const [projects, setProjects] = useState([])
    const dbRef = ref(db)

    useEffect( () => {
        getUsers()    
    },[])

    function SortByUsername(a){
        a.sort((a,b) => {
            let fa = a.Username,
            fb = b.Username

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        return a
    }
    
    function getUsers(){
        get(child(dbRef, `User`)).then((snapshot) => {
            let a = []
            if (snapshot.exists()){
                for (let key in snapshot.val()){
                    a.push(
                        snapshot.val()[key]
                    )
                }
                setUsers(SortByUsername(a))
            }
        })
    }

    function deleteUser(e){
    
        remove(ref(db, `User/${e.target.value}`)).then(() => {
            alert('Usuario eliminado com sucesso')
            document.getElementById(`closemodal${e.target.id}`).click()
            getUsers()
        })
            
    }
    
    function updateUser(e){
        history.push({
            pathname: '/updateuser',
            search: `?key=${e.target.id}`,
        })    
    }

    
    function searchUsers(e){
    
        let a = []
        if (e.target.value === ''){
            getUsers()
        }
        else{
            a = users.filter(element => element.Username.includes(e.target.value))  
            setUsers(a)
        }
    }
    
    function add(e){
        history.push({
            pathname: '/adduser',
        })
    }

    function buildTable(){
        var values = []
        let count = 0
            
            console.log(users)

            for(let key in users){
                
                values.push(
                    <button
                        style={{background: 'transparent',
                                border: 'none',
                                width: '100%',
                                outline: 'none',
                            }}
                    >
                        <div className='rows-report' id={`${count++}.${users[key].Key}`}>
                            <div className='colmns-report'>
                                <ul > <li >{values.length + 1} </li>
                                    <li >{users[key].Username}</li>
                                    <li >{users[key].Role}</li>
                                    <li className='project-icons' ><i className="bi bi-trash" data-toggle="modal" data-target={`#exampleModal${count}`} /></li>
                                    <li className='project-icons' ><i className="bi bi-pencil" id={`${users[key].Id}`} onClick={updateUser}/></li>
                                </ul>
                            </div>
                        </div>
                
                        <div className="modal fade" id={`exampleModal${count}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Confirmação </h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Apagar Usuario ?
                                    </div>
                                    <div className='modal-footer'>
                                            <button type="button" id={`closemodal${count}`} className="btn btn-secondary" data-dismiss="modal">Não</button>
                                            <button type='button'  id={count} className='btn btn-primary' value={`${key}`}onClick={deleteUser}> Sim</button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </button>
                )    
            }
            return values
    }       
    return( 
        <div className='users-container'>
            <div className='title' id='title'>
                <input type='tex'  onChange={searchUsers} className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."/>
                <button type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
            <div className='header-container'>
                <div className='report-header'>Nr</div>
                <div className='report-header'>Usuario</div>
                <div className='report-header'>Tipo</div>
                <div className='report-header'>Apagar</div>
                <div className='report-header'>Actualizar</div>
            </div>
                {buildTable()}
        </div>
    )
}

export default Users

