import React from 'react'
import './AddMacroActivities.css'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import {ref,set} from 'firebase/database'
import {db} from '../database/DatabaseHelper'

function AddMacroActivities(){

    const [macroActivity, setMacroActivity] = useState({
        Key: uuidv4(),
        Name: '',
        ProductKey: document.URL.split('=')[1]
    })

    function setName(e){
        setMacroActivity({
            Key: macroActivity.Key,
            Name: e.target.value,
            ProductKey: macroActivity.ProductKey
        })
    }
    
    function saveMacroAcrivity(){
        set(ref(db, 'MacroActivity/' + uuidv4()), macroActivity);
        document.getElementById('closemodal').click()
        window.history.back()
    }

    function clear(e){
        document.getElementById('mcs').value = ''
        setMacroActivity({
            Key: macroActivity.Key,
            Name: '',
            ProductKey: macroActivity.ProductKey
        })
    }

    function back(){
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
                    Adicionar Macro Actividade
                </div>
            </div>
        <div className="form-group">
            <label for="exampleInputEmail1">Nome da Macro Actividade</label>
            <input type="text" id='mcs'  onChange={setName} className="form-control" aria-describedby="emailHelp" />
        </div>
        
        <button type="button"  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Gravar Macro Actividade</button>
        <button type="button" className="btn btn-light" onClick={clear}>Limpar</button>

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
                    <label for="exampleInputEmail1">Submeter Macro Actividade ?</label>
                </div>
            </form>
                </div>
                    <div className="modal-footer">
                        <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Não</button>
                        <button type="button" className="btn btn-primary" onClick={saveMacroAcrivity} >Sim</button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    )
}
export default AddMacroActivities