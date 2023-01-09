import { useEffect,useState } from "react"
import React from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, getDatabase, ref } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

function Users(){

    const [users, setUsers]  = useState({projs: []})
    const history = useHistory()
    
    function handleButtonEvent(e){
       
        let productKey = e.target.id
        let key  = productKey.split('.')
        
        if (key[0] === 'delete'){
            alert('deleting')
        }
        else if (key[0] === 'update'){
            alert('updating')
        }    
     }
 
    useEffect( () => {
        const dbRef = ref(db)
        
        get(child(dbRef, `User`)).then((snapshot) => {
                if (snapshot.exists())
                    setUsers({projs: snapshot.val()})
                else
                    alert('no data to load from db server')
        }
        )},[])
    
    function buildTable(){
        var values = []
        let count = 0
        if (users !== null ){
            for(let key in users.projs){
               values.push(
                <button onClick={handleButtonEvent}
                    style={{background: 'transparent',
                            border: 'none',
                            width: '100%',
                            outline: 'none',
                        }}
                >
                    <div className='rows-report' id={`${count++}.${users.projs[key].Key}`}>
                        <div className='colmns-report'id={`${count++}.${users.projs[key].Key}`} >
                            <ul id={`${count++}.${users.projs[key].Key}`}>
                                <li id={`${count++}.${users.projs[key].Key}`}>
                                    {values.length + 1}
                                </li>
                                <li id={`${count++}.${users.projs[key].Key}`}>
                                    {users.projs[key].Username}
                                </li>
                                <li id={`${count++}.${users.projs[key].Key}`}>
                                    {users.projs[key].Role}
                                </li>
                                <li className='project-icons' id={`${count++}.${users.projs[key].Key}`}>
                                    <i className="bi bi-trash" id={`delete.${count++}.${users.projs[key].Key}`} />
                                </li>
                                <li className='project-icons' id={`${count++}.${users.projs[key].Key}`}>
                                    <i className="bi bi-pencil" id={`update.${count++}.${users.projs[key].Key}`}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </button>
               )    
            }
        }

        function add(e){
            history.push({
                pathname: '/adduser',
            })
        }
        
        return( 
        <div >
            <div className='title' id='title'>
                <input type='tex' className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                <button type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
            <div className='header-container'>
                <div className='report-header'>Nr</div>
                <div className='report-header'>Usuario</div>
                <div className='report-header'>Tipo</div>
                <div className='report-header'>Apagar</div>
                <div className='report-header'>Actualizar</div>
            </div>
                {values}
            </div>
        )
    }

    return buildTable()
}

export default Users