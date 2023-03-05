import React from 'react'
import {db} from '../database/DatabaseHelper'
import {useState, useEffect} from 'react'
import { child, get, ref } from "firebase/database"
import ActivityPDF from '../ReportsPDF/ActivityPDF'

function Reports(){

    const [macroActivities, setMacroActivities ] = useState()
    const [activities, setActivities ] = useState()
    const [products, setProducts] = useState()
    const [projects, setProjects ] = useState()
    const [wholeData, setWholeData] = useState({})
    const dbRef = ref(db)

    function getProducts(){
        get(child(ref(db), 'Product')).then( snapshot => {
            if (snapshot.exists()){
                setProducts(snapshot.val())
            }
        })
    }

    function getProjects(){

        getProducts()
        getMacroActivities()

        get(child(ref(db), 'Project')).then( snapshot => {
            if (snapshot.exists()){
                setProjects(snapshot.val())
                let a = {}
                for (let projectKey in projects){
                    for (let productKey in products){
                        if ( products[productKey].ProjectKey === projects[projectKey].Key){
                            for (let mcsKey in macroActivities){
                                if (macroActivities[mcsKey].ProductKey === products[productKey].Key){
                                    a[mcsKey] = { 
                                                        ProjectName: `${projects[projectKey].ProjectName}`,
                                                        ProductName:  `${products[productKey].Name}`,
                                                        MacroActivityName:  `${macroActivities[mcsKey].Name}}`
                                                     }
                                }
                            }
                        }
                    }
                }
                setWholeData(a)
            }
        })

    }

    function getMacroActivities(){
        
        get(child(ref(db), `MacroActivity`)).then((snapshot) => {
            if (snapshot.exists()){
                setMacroActivities(snapshot.val())
            }
        })
    }

    useEffect( () => {
        getProjects()
            
            get(child(dbRef, 'Activity')).then( snapshot => {

                if (snapshot.exists()){
                    setActivities(snapshot.val())
                }
            })
        }
    ,[])

    function getActivities(mcs){

        let a = []
        for (let index in activities.acts){
            if (mcs.Key === activities.acts[index].MacroActivityKey){
                a.push(activities.acts[index])
            }
        }
        return a
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

        getProjects()
        setTimeout(function doesnothing(){},1)
        
        for(let key in wholeData){
            console.log(wholeData)
            values.push(                 
                 <div> 
                    <button 
                                style={{background: 'transparent',
                                    border: 'none',
                                    width: '100%',
                                    outline: 'none',
                                }}>

                        <div className='rows-report' id={`${count++}.${key}`} >
                            <div className='colmns-report'>
                                <ul >
                                    <li>
                                        {++index}
                                    </li>
                                
                                    <li id={`${count++}.${key}`} >
                                        {wholeData[key].ProjectName}
                                    </li>
                                   
                                    <li id={`${count++}.${key}`}>
                                        {wholeData[key].ProductName}
                                    </li>
                                   
                                    <li id={`${count++}.${key}`} >
                                        {wholeData[key].MacroActivityName}
                                    </li>
                                    
                                    <li id={`${count++}.${key}`}>
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
                    <button type='button' className='btn btn-danger' style={{marginLeft: '10px'}}>Relatotio Completo</button>
                </div>
                <div className='header-container'>
                    <div className='report-header'>Nr</div>
                    <div className='report-header'>Projecto</div>
                    <div className='report-header'>Producto</div>
                    <div className='report-header'>Macro Actividade</div>
                    <div className='report-header'>Baixar Relatorio</div>
                </div>
                    {getRows()}
                </div>
            </div>
    )
}

export default Reports
