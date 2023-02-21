import React from 'react'
import './AddProducts.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {db} from '../database/DatabaseHelper'
import {set,ref,get,child} from 'firebase/database'
import {v4 as uuidv4} from 'uuid';

function UpdateLAT(){

    const dbRef = ref(db)
    
    const [projects, setProjects ] = useState()

    const [lat, setLat] = useState({
        Description: '',
        Name: '',
        ProjectKey: '',
        Key: ''
    })
    

    function getProjects(){
        get(child(dbRef, `Project`)).then((snapshot) => {
            if (snapshot.exists()){
                setProjects(snapshot.val())
            }
         })
    }

    useEffect( () => {
        getProjects() 
        },
    [])
    
    

    function saveLAT (e){

        set(ref(db, 'LAT/' + uuidv4()), lat).then(() => {
            alert('LAT adicionado com sucesso')
        }).catch(() => {
            alert('Erro ao adicionar a LAT')
        })

        document.getElementById(`closemodal`).click()
        back()
    }

    function back(){
        window.history.back()
    }

    function setName(e){
        setLat({
            Description: lat.Description,
            Name: e.target.value,
            ProjectKey: lat.ProjectKey,
            Key: lat.Key
        })
    }

    function setDescription(e){
        setLat({
            Description: e.target.value,
            Name: lat.Name,
            ProjectKey: lat.ProjectKey,
            Key: lat.Key
        })
    }

    function setProject(e){
        
        let a = ''
        for (let key in projects){
            if (e.target.value === projects[key].ProjectName){
                a = projects[key].Key
                break
            }
        }

        setLat({
            Description: lat.Description,
            Name: lat.Name,
            ProjectKey: a,
            Key: lat.Key
        })
    }


    function generateProjectSelection(){

        let a = []
        a.push(<option selected value={'Selectione Uma opção'} > Selecione um projecto</option>)

        for (let key in projects){
            a.push( 
                <option  value={projects[key].ProjectName} id={projects[key].Key}> {projects[key].ProjectName}</option>
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
                    Adicionar LAT
                </div>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Nome da Linha de Acção Tematica</label>
                <input type="text" onChange={setName} className="form-control" aria-describedby="emailHelp" />
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Descrição</label>
                <input type="text" onChange={setDescription} className="form-control" aria-describedby="emailHelp" />
            </div>

            <div className="form-group">
                <label for="exampleInputEmail1">Projecto</label>
                <select className="form-select" aria-label="Default select example" onChange={setProject}>
                    {generateProjectSelection()}
                </select>
            </div>
        
            <button type="button"  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Gravar LAT   
            </button>

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
                        <label for="exampleInputEmail1">Submeter Producto ?</label>
                    </div>
                </form>
                    </div>
                        <div className="modal-footer">
                            <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Não</button>
                            <button type="button" onClick={saveLAT} className="btn btn-primary">Sim</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
    
}

export default UpdateLAT