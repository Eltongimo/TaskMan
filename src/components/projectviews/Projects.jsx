import React, { useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, getDatabase, ref } from "firebase/database"
import TaskRow from '../TaskRow'
import {Link} from 'react-router-dom'
import './Projects.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { useState } from 'react'

function Projects (){
    
    const [projects, setProjects]  = useState({projs: []})
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
        else{
            history.push({
                pathname: '/products',
                search: `?key=${key[1]}`,
              })
        }    
     }
 
    useEffect( () => {
        const dbRef = ref(db)
        
        get(child(dbRef, `Project`)).then((snapshot) => {
                if (snapshot.exists())
                    setProjects({projs: snapshot.val()})
                else
                    alert('no data to load from db server')
        }
        )},[])
    
    function buildTable(){
        var values = []
        let count = 0
        if (projects !== null ){
            for(let key in projects.projs){
               values.push(
                <button onClick={handleButtonEvent}
                    style={{background: 'transparent',
                            border: 'none',
                            width: '100%',
                            outline: 'none',
                        }}
                >
                    <div className='rows-report' id={`${count++}.${projects.projs[key].Key}`}>
                        <div className='colmns-report'id={`${count++}.${projects.projs[key].Key}`} >
                            <ul id={`${count++}.${projects.projs[key].Key}`}>
                                <li id={`${count++}.${projects.projs[key].Key}`}>
                                    {values.length + 1}
                                </li>
                                <li id={`${count++}.${projects.projs[key].Key}`}>
                                    {projects.projs[key].ProjectName}
                                </li>
                                <li id={`${count++}.${projects.projs[key].Key}`}>
                                    {projects.projs[key].TypeOfActivity}
                                </li>
                                <li className='project-icons' id={`${count++}.${projects.projs[key].Key}`}>
                                    <i class="bi bi-trash" id={`delete.${count++}.${projects.projs[key].Key}`} />
                                </li>
                                <li className='project-icons' id={`${count++}.${projects.projs[key].Key}`}>
                                    <i class="bi bi-pencil" id={`update.${count++}.${projects.projs[key].Key}`}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </button>
               )    
            }
        }
        return( 
        <div className='table-container'>
            <div className='header-container'>
                <div className='report-header'>Nr</div>
                <div className='report-header'>Nome do Projecto</div>
                <div className='report-header'>Tipo de Actividade</div>
                <div className='report-header'>Apagar</div>
                <div className='report-header'>Actualizar</div>
            </div>
                {values}
            </div>
        )
    }
    return buildTable()
}

export default Projects