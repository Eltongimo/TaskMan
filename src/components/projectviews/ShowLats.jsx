import React, { useEffect } from 'react'
import { useState,  } from 'react'
import {db} from '../database/DatabaseHelper'
import { child, get, ref, remove} from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

function ShowLats(){

    const [lats, setLats] = useState()
    const [projects, setProjects] = useState()
    const dbRef = ref(db)
    const history = useHistory()


    function getLAT(){
        get(child(dbRef, 'LAT')).then( snapshot => {

            if (snapshot.exists()){
                setLats(snapshot.val())
            }
        })

    }

    function  getProjects(){
        get(child(dbRef, 'Project')).then( snapshot => {
            if (snapshot.exists())
                setProjects(snapshot.val())
        })
    }

    useEffect(() => {
        getLAT()
        getProjects()
    },[])

    function add(e){
        history.push({
            pathname: '/addlat',
        })    
    }

    function deleteLats(e){
      remove(ref(db, `LAT/${e.target.value}`)).then(()=> {
            alert(' LAT eliminada com Sucesso ')
            getLAT()
        }).catch(() => {
            alert('Erro ao eliminar LAT')
        })
        document.getElementById(`closemodal${e.target.id}`).click()
    }

    function updateLAT(){
        alert('Update will available soon')
    }

    function buildTable(){
        var values = []
        let count = 0
        if (lats !== null ){
            for(let key in lats){
                values.push(
                    <button 
                        style={{background: 'transparent',
                                border: 'none',
                                width: '100%',
                                outline: 'none',
                            }}
                    >
                        <div className='rows-report' id={`${count++}.${lats[key].Key}`}>
                            <div className='colmns-report'id={`${count++}.${lats[key].Key}`} >
                                <ul id={`${count++}.${lats[key].Key}`}>
                                    <li id={`${count++}.${lats[key].Key}`}>
                                        {lats[key].Description }
                                    </li>
                                    <li className='project-icons' id={`${count++}.${lats[key].Key}`}>
                                        <i className="bi bi-pencil" onClick={updateLAT} id={`update.${count++}.${key}`}
                                        />
                                    </li>
                                    <li className='project-icons' id={`${count++}.${lats[key].Key}`}>
                                        <i className="bi bi-trash" id={`delete.${count}.${lats[key].Key}`} data-toggle="modal" data-target={`#exampleModal${count}`} 
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
                                            <label style={{textAlign: 'left'}} for="exampleInputEmail1">Apagar LAT ?</label>
                                        </div>
                                    </form>
                                        </div>
                                            <div className="modal-footer">
                                                <button type="button" id={`closemodal${count}`} className="btn btn-secondary" data-dismiss="modal">Não</button>
                                                <button type="button" id={count} value={key} onClick={deleteLats} className="btn btn-primary">Sim</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </button>
                    )    
                }
            }
       return values
    }
    
    function searchLAT(e){
        let a = []
        if (e.target.value === ''){
            getLAT()
        }
        else{
            a = lats.filter(element => element.Name.includes(e.target.value))  
            setLats(a)
        }
    }
    return (
         <div >
            <div className='title' id='title'>
                <input type='tex' onChange={searchLAT} className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                <button  type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
            <div className='header-container'>
                <div className='report-header'>LAT</div>
                <div className='report-header'>Actualizar</div>
                <div className='report-header'>Apagar</div>
            </div>
            {buildTable()}
        </div>
    )
}

export default ShowLats