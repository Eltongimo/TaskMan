import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, getDatabase, ref } from "firebase/database"
import '../TaskRow.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function MacroActivity(){
    
    const [macroActivities, setMacroActivities] = useState({mcs: []})
    const history = useHistory()

    useEffect( () => {
         const dbRef = ref(db)
           
            get(child(dbRef, `MacroActivity`)).then((snapshot) => {
                    if (snapshot.exists()){
                        const mcs = snapshot.val()
                        let macroA = []
                        for(let key in mcs){
                            if (mcs[key].ProductKey === document.URL.split('=')[1])
                                macroA.push(mcs[key])
                        }
                        setMacroActivities({mcs: macroA})
                    }
                    else{
                     alert('no data to load from db server')
                    }
                })
            },[]
    )

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
                pathname: '/activities',
                search: `?key=${key[1]}`,
            })
        }
    }
 
    function buildTableforMcs(){
        
        var values = []
        let count = 0

        if (macroActivities !== null ){
            for(let data in macroActivities.mcs){
               values.push( 
                <button               
                    style={{background: 'transparent',
                        border: 'none',
                        width: '100%',
                        outline: 'none',
                    }}
                    onClick={handleButtonEvent}
                 >
                    <div className='rows-report' id={`${count++}.${macroActivities.mcs[data].Key}`}>
                        <div className='colmns-report' id={`${count++}.${macroActivities.mcs[data].Key}`} >
                            <ul id={`${count++}.${macroActivities.mcs[data].Key}`} >
                                <li id={`${count++}.${macroActivities.mcs[data].Key}`}>
                                    {macroActivities.mcs[data].Name}
                                </li>
                                <li id={`${count++}.${macroActivities.mcs[data].Key}`} >
                                 <i class="bi bi-trash" id={`delete.${count++}.${macroActivities.mcs[data].Key}`} />
                                </li>
                                <li id={`${count++}.${macroActivities.mcs[data].Key}`}>
                                    <i class="bi bi-pencil" id={`update.${count++}.${macroActivities.mcs[data].Key}`}/>
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
                <div className='report-header'>Nome da Macro Actividade</div>
                <div className='report-header'>Apagar</div>
                <div className='report-header'>Actualizar</div>
            </div>
                 {values}
        </div>
        )
    }
    return buildTableforMcs()
}

export default MacroActivity