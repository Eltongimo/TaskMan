import React from 'react'
import { useState,useEffect } from 'react'
import {v4 as uuidv4} from 'uuid';
import {ref,child,update,get} from 'firebase/database'
import {db} from '../database/DatabaseHelper'

function UpdateMacroActivity(){
    const dbRef = ref(db)
    const productKey = document.URL.split('=')[1]
    const [macroActivity, setMacroActivity] = useState({
        Key: uuidv4(),
        Name: '',
        ProductKey: document.URL.split('=')[1]
    })

    useEffect( () => {
        get(child(dbRef, `MacroActivity/${document.URL.split('=')[1]}`)).then((snapshot) => {
            if (snapshot.exists()){
                setMacroActivity(snapshot.val())
            }
        })
    },[])

    function setName(e){
        setMacroActivity({
            Key: macroActivity.Key,
            Name: e.target.value,
            ProductKey: macroActivity.ProductKey
        })
    }
    
    function updateMacroAcivity(e){

        update(child(dbRef, `MacroActivity/${document.URL.split('=')[1]}`), macroActivity).then(() => {
            alert('Macro Actividade Actualizada com sucesso ')
        }).catch(() => {
            alert('Erro ao actualizar a Macro Actividade ')
        })
        back()
        document.getElementById('closemodal').click()
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
            <input type="text" id='mcs' value={macroActivity.Name}  onChange={setName} className="form-control" aria-describedby="emailHelp" />
        </div>
        
        <button type="button"  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Actualizar</button>
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
                    <label for="exampleInputEmail1">Actualizar Macro Actividade ?</label>
                </div>
            </form>
                </div>
                    <div className="modal-footer">
                        <button type="button" id='closemodal' className="btn btn-secondary" data-dismiss="modal">Não</button>
                        <button type="button" className="btn btn-primary" onClick={updateMacroAcivity} >Sim</button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    )
}
export default UpdateMacroActivity