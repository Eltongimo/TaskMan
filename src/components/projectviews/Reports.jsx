import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref } from "firebase/database"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ActivityPDF from '../ReportsPDF/ActivityPDF'

function Reports(){

    const [macroActivities, setmacroActivities ] = useState({mcs: []})
    const [activities, setActivities ] = useState({acts: []})
    const [activitiesCount, setActivitiesCount] = useState({})
    const [mActivities, setMActivities] = useState({})
    useEffect( () => {
        const dbRef = ref(db)
           
            get(child(dbRef, `MacroActivity`)).then((snapshot) => {
                    if (snapshot.exists()){
                        setmacroActivities({mcs: snapshot.val()})
                    }
                    else
                        alert('no data to load from db server')
            }).catch(()=>{
                alert('Verifique a conexão com a internet')
            })

            get(child(dbRef, 'Activity')).then( snapshot => {

                if (snapshot.exists()){
                    setActivities({acts: snapshot.val()})
                }
                console.log(activities)
            })
        }
    ,[])

    function getActivities(mcs){

        let a = []
        let count = 0
        for (let index in activities.acts){
            if (mcs.Key === activities.acts[index].MacroActivityKey){
                a.push(activities.acts[index])
            }
        }
        
        console.log(a)

        return a
    }

    function handleButtonEvent(){

    }

    function generatePDF(e){
        
        const key = e.target.id.split('.')[1]
        
        const macroAct = macroActivities.mcs[key]
        
        const acts = getActivities(macroAct)

        ActivityPDF(acts, macroAct)

    }

    function getRows(){
        let values = []
        let index = 0
        let count = 0

        for(let key in macroActivities.mcs){
                values.push(                 
                 <div> 
                    <button onClick={handleButtonEvent}
                                style={{background: 'transparent',
                                    border: 'none',
                                    width: '100%',
                                    outline: 'none',
                                }}>

                        <div className='rows-report' id={`${count++}.${macroActivities.mcs[key].Key}`} >
                            <div className='colmns-report'>
                                <ul id={`${count++}.${macroActivities.mcs[key].Key}`} >
                                    <li id={`${count++}.${macroActivities.mcs[key].Key}`} >
                                        {++index}
                                    </li>
                                
                                    <li id={`${count++}.${macroActivities.mcs[key].Key}`} >
                                        {macroActivities.mcs[key].Name}
                                    </li>
                                    
                                    <li id={`${count++}.${macroActivities.mcs[key].Key}`}>
                                        <i id={`${count++}.${key}`} className="bi bi-file-earmark-arrow-down" style={{color: 'blue', fontSize: '1.2rem'}}
                                            onClick={generatePDF}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </button>
                </div>)
             }
        return values    
    }

    return (
        <div>
            <div className='table-container'>
                <div className='title' id='title'>
                    <input type='tex' className="form-control" id="search" aria-describedby="emailHelp" placeholder="Procurar.."></input>
                </div>
                <div className='header-container'>
                    <div className='report-header'>Nr</div>
                    <div className='report-header'>Macro Actividade</div>
                    <div className='report-header'>Baixar Relatorio</div>
                </div>
                {
                    getRows()
                }
            </div>
        </div>
    )
}

export default Reports
