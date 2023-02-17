import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref, remove,update } from "firebase/database"
import '../TaskRow.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function MacroActivity(){
    
    const [macroActivities, setMacroActivities] = useState({mcs: []})
    const [keys, setKeys ] = useState()
    const history = useHistory()
    const dbRef = ref(db)

    function getMCS(){
        get(child(dbRef, `MacroActivity`)).then((snapshot) => {
            if (snapshot.exists()){
                const mcs = snapshot.val()
                let macroA = []
                let macAkeys = []
                for(let key in mcs){
                    if (mcs[key].ProductKey === document.URL.split('=')[1])
                    macroA.push(mcs[key])
                    macAkeys.push(key)
                }
                setMacroActivities(macroA)
                setKeys(macAkeys)
            }

        })
    }

    useEffect( () => {
        getMCS()       
    },[])

    function deleteMacroActivity(e){
        remove(ref(db, `MacroActivity/${e.target.value}`)).then(()=> {
            alert('Macro Actividade Apagada com Sucesso ')
            getMCS()
        }).catch(() => {
            alert('Erro ao eliminar Macro Actividade')
        })

        document.getElementById(`closemodal${e.target.id}`).click() 

    }

    
    function searchMcs(e){
        
        let a = []
        if (e.target.value === ''){
            getMCS()
        }
        else{
            a = macroActivities.filter(element => element.Name.includes(e.target.value))  
            setMacroActivities(a)

        }
    }
   function handleButtonEvent(e){
      
        let productKey = e.target.id
        let key  = productKey.split('.')
        
        history.push({
            pathname: '/activities',
            search: `?key=${key[1]}`,
        })    

    }

    function updateMacroActivities(e){

        history.push({
            pathname: '/updatemacroactivity',
            search: `?key=${e.target.id.split('.')[2]}`,
        })
    
    }

    function buildTableforMcs(){
    
        var values = []
        let count = 0
        if (macroActivities !== null ){
            for(let data in macroActivities){
                values.push( 
                    <div>
                        <button               
                            style={{background: 'transparent',
                                border: 'none',
                                width: '100%',
                                outline: 'none',
                            }}
                            >
                            <div className='rows-report' id={`${count++}.${macroActivities[data].Key}`}>
                                <div className='colmns-report'>
                                    <ul>
                                        <li id={`${count++}.${macroActivities[data].Key}`} onClick={handleButtonEvent}>
                                            {macroActivities[data].Name}
                                        </li>
                                        <li id={`${count++}.${data}`}>
                                            <i className="bi bi-pencil" id={`update.${count++}.${macroActivities[data].Key}`} onClick={updateMacroActivities}/>
                                        </li>
                                        <li id={`delete.${count}.${data}`} >
                                            <i className="bi bi-trash"   data-toggle="modal" data-target={`#exampleModal${count}` }/>
                                        </li>
                                    </ul>
                                </div>
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
                                            <label style={{textAlign: 'left'}} for="exampleInputEmail1">Apagar Macro Acrividade ?</label>
                                        </div>
                                    </form>
                                        </div>
                                            <div className="modal-footer">
                                                <button type="button" id={`closemodal${data}`} className="btn btn-secondary" data-dismiss="modal">Não</button>
                                                <button type="button" id={data} value= {macroActivities[data].Key} onClick={deleteMacroActivity} className="btn btn-primary">Sim</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </button>
                </div>)
            }
            
        }

        function add(){
            history.push({
                pathname: '/addmacroactivities',
                search: `?key=${document.URL.split('/')[3].split('=')[1]}`,
            })
        }

        function back()
        {
            window.history.back()
        }

        return( 
        <div>
             <div className='title' id='title'>
              <i className="bi bi-arrow-left" style={{cursor: 'pointer',
                                                         marginRight: '20px'
                }} onClick={back}/>
                <input type='tex' onChange={searchMcs} className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                <button type="button" className="btn btn-light" id='addbutton' onClick={add}>Adicionar</button>
            </div>
           
            <div className='table-container'>
                <div className='header-container'>
                    <div className='report-header'>Nome da Macro Actividade</div>
                    <div className='report-header'>Actualizar</div>
                    <div className='report-header'>Apagar</div>
                </div>
                    {values}
            </div>
        </div>        
        )
    }
    return buildTableforMcs()
}

export default MacroActivity